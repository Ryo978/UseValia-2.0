package um.es.usevalia.service;

import com.itextpdf.layout.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.chart.GuidelinesPieChart;
import um.es.usevalia.chart.ScoreGuidelineChart;
import um.es.usevalia.mapper.AuditoriaMapper;
import um.es.usevalia.mapper.AuditoriaMapperImpl;
import um.es.usevalia.model.*;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.model.enums.Evaluacion;
import um.es.usevalia.report.AuditInformation;
import um.es.usevalia.report.AuditReport;
import um.es.usevalia.report.AuditResult;
import um.es.usevalia.repository.AuditoriaRepository;

import java.io.FileNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Service
public class AuditoriaService {

    @Autowired
    AuditoriaRepository repository;
    @Autowired
    PuntuacionService puntuacionService;
    @Autowired
    DirectrizService directrizService;
    @Autowired
    UsuarioService usuarioService;
    @Autowired
    AplicacionService aplicacionService;
    @Autowired
    CatalogoService catalogoService;
    @Autowired
    GrupoDirectricesService grupoDirectricesService;
    @Autowired
    TareaService tareaService;

    @Autowired
    ValorPuntuacionService valorPuntuacionService;

    AuditoriaMapper mapper = new AuditoriaMapperImpl();


    public List<AuditoriaDTO> listAuditoria() {
        return repository.findAll().stream().map(mapper::auditoriaToAuditoriaDTO).toList();
    }

    public void deleteAuditoria(Long id) {
        List<Puntuacion> puntuaciones = puntuacionService.listByAuditoria(id);
        puntuaciones.forEach(puntuacionService::deletePuntuacion);
        repository.deleteById(id);
    }

    public AuditoriaDTO getAuditoriaDTO(Long id) {
        return mapper.auditoriaToAuditoriaDTO(getAuditoria(id));
    }

    public Auditoria getAuditoria(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AuditoriaDTO addAuditoria(AuditoriaDTO auditoriaDTO) {
        Auditoria auditoria = mapper.auditoriaDTOToAuditoria(auditoriaDTO, usuarioService, aplicacionService,
                catalogoService);
        auditoria = repository.save(auditoria);
        auditoriaDTO.setId(auditoria.getId());
        return auditoriaDTO;
    }

    public List<AuditoriaDTO> listByUser(Long userId) {
        return repository.findByUsuario_Id(userId).stream()
                .map(mapper::auditoriaToAuditoriaDTO)
                .toList();
    }


    public Boolean getEvaluationComplete(Long id) {
        Auditoria auditoria = getAuditoria(id);
        long totalPuntuacion = puntuacionService.getTotalByAudit(id);
        long totalDirectrices = 0;
        switch (auditoria.getEvaluacion()) {
            case BASIC -> totalDirectrices = directrizService.getTotalBasicByCatalog(auditoria.getCatalogo().getId());
            case STANDARD -> totalDirectrices = directrizService.getTotalByCatalog(auditoria.getCatalogo().getId());
            case TASKS -> {
                long totalTareas = tareaService.getTotalByCategoria(auditoria.getAplicacion().getCategoria());
                totalDirectrices = directrizService.getTotalByCatalog(auditoria.getCatalogo().getId()) * totalTareas;
            }
            default -> {
            }
        }
        return totalPuntuacion >= totalDirectrices;
    }

    public void closeAudit(Long id) {
        Auditoria auditoria = getAuditoria(id);
        auditoria.setFechaFinReal(new Date());
        repository.save(auditoria);
    }

    public void openAudit(Long id) {
        Auditoria auditoria = getAuditoria(id);
        auditoria.setFechaFinReal(null);
        repository.save(auditoria);
    }

    public Document getAuditReport(Long id, String filename) throws FileNotFoundException {
        Auditoria auditoria = getAuditoria(id);
        AuditInformation information = new AuditInformation();
        fillAuditInformation(information, auditoria);
        List<Puntuacion> puntuaciones = puntuacionService.listByAuditoria(id);
        List<Tarea> tareas = new LinkedList<>();
        if (auditoria.getEvaluacion().equals(Evaluacion.TASKS))
            tareas = puntuaciones.stream().map(Puntuacion::getTarea).distinct().toList();
        List<GrupoDirectrices> grupos =
                grupoDirectricesService.getGrupoDirectricesByCatalogo(auditoria.getCatalogo().getId());
        List<Directriz> directrices = new LinkedList<>();
        grupos.forEach(grupo -> directrices.addAll(directrizService.getAllByGrupo(grupo.getId())));
        information.setCriteriosSalida(getCriteriosSalida(directrices, auditoria, tareas.size()));
        boolean isPassed = getEvaluacion(auditoria, information, puntuaciones, directrices, tareas.size());
        List<AuditResult> results = buildResult(auditoria, directrices, puntuaciones, tareas);
        return AuditReport.createReport(auditoria, information, results, tareas, isPassed, filename);


    }

    /*
    * Los criterios de salida van a tener unos valores aproximados a estos:
    * baja: 30% para pasar
    * media: 60% para pasar
    * alta: 80% para pasar
    */
    private String getCriteriosSalida(List<Directriz> directrices, Auditoria auditoria, int totalTareas) {
        long totalBajaPrioridad = directrices.stream().filter(directriz -> directriz.getPeso() == 3).count();
        long totalMediaPrioridad = directrices.stream().filter(directriz -> directriz.getPeso() == 2).count();
        long totalAltaPrioridad = directrices.stream().filter(directriz -> directriz.getPeso() < 2).count();
        if (totalTareas == 0) totalTareas = 1;
        if (totalBajaPrioridad == 0)
            return ("Number of failures allowed at each priority level: \n" +
                    "-Mid: " + (int)(totalMediaPrioridad * (auditoria.getUsuarios().size()*0.6)) * totalTareas + "\n" +
                    "-High: " + (int)(totalAltaPrioridad * (auditoria.getUsuarios().size()*0.4)) * totalTareas + "\n");
        return ("Number of failures allowed at each priority level: \n" +
                    "-Low: " + (int)(totalBajaPrioridad * (auditoria.getUsuarios().size()*0.9)) * totalTareas + "\n" +
                "-Mid: " + (int)(totalMediaPrioridad * (auditoria.getUsuarios().size()*0.6)) * totalTareas + "\n" +
                "-High: " + (int)(totalAltaPrioridad * (auditoria.getUsuarios().size()*0.4)) * totalTareas + "\n");

    }

    private boolean getEvaluacion(Auditoria auditoria, AuditInformation information,
                                  List<Puntuacion> puntuaciones, List<Directriz> directrices, int totalTareas) {
        EsquemaPuntuacion esquema = auditoria.getCatalogo().getEsquema();
        List<ValorPuntuacion> valores = valorPuntuacionService.listValoresByEscala(esquema.getId());
        long totalBajaPrioridad = directrices.stream().filter(directriz -> directriz.getPeso() == 3).count();
        long totalMediaPrioridad = directrices.stream().filter(directriz -> directriz.getPeso() == 2).count();
        long totalAltaPrioridad = directrices.stream().filter(directriz -> directriz.getPeso() < 2).count();
        if (totalTareas == 0) totalTareas = 1;
        int maxFallosBaja = (int)(totalBajaPrioridad * (auditoria.getUsuarios().size() * 0.9)) * totalTareas;
        int maxFallosMedia = (int)(totalMediaPrioridad * (auditoria.getUsuarios().size() * 0.6)) * totalTareas;
        int maxFallosAlta = (int)(totalAltaPrioridad * (auditoria.getUsuarios().size() * 0.4)) * totalTareas;
        long fallosbaja = 0;
        long fallosmedia = 0;
        long fallosalta = 0;
        for (Puntuacion puntuacion : puntuaciones) {
            Directriz directriz = puntuacion.getDirectriz();
            //TODO: revisar para hacer media sobre una misma directriz.
            ValorPuntuacion valor = valores.stream().
                    filter(valorPuntuacion -> valorPuntuacion.getNombre().equals(puntuacion.getPuntuacion()))
                    .findFirst().orElse(null);
            if (valor == null) {
                continue;
            }
            if (directriz.getPeso() == 3) {
                if (!valor.isTipo()) {
                    fallosbaja++;
                }
            } else if (directriz.getPeso() == 2) {
                if (!valor.isTipo()) {
                    fallosmedia++;
                }
            } else {
                if (!valor.isTipo()) {
                    fallosalta++;
                }
            }
        }
        if (fallosbaja > maxFallosBaja && auditoria.getEvaluacion().equals(Evaluacion.BASIC)) {
            information.setEvaluacion("No superada");
            return false;
        }
        if (fallosmedia > maxFallosMedia) {
            information.setEvaluacion("No superada");
            return false;
        }
        if (fallosalta > maxFallosAlta) {
            information.setEvaluacion("No superada");
            return false;
        }
        information.setEvaluacion("Superada");
        return true;

    }

    private List<AuditResult> buildResult(Auditoria auditoria, List<Directriz> directrices, List<Puntuacion> puntuaciones, List<Tarea> tareas){
        List<AuditResult> results = new LinkedList<>();
        boolean basic = auditoria.getEvaluacion().equals(Evaluacion.BASIC);
        int tareasSize = tareas.size() == 0 ? 1 : tareas.size();

        for (int i = 0; i < tareasSize; i++) {
            for (Directriz directriz : directrices) {
                if (basic && directriz.getPeso() == 3)
                    continue;
                List<Puntuacion> puntuacionesDirectriz;
                if (!tareas.isEmpty()){
                    Tarea tarea = tareas.get(i);
                    puntuacionesDirectriz = puntuaciones.stream().
                            filter(p -> p.getTarea().equals(tarea)).
                            filter(p -> p.getDirectriz().getId().equals(directriz.getId())).toList();
                }else {
                    puntuacionesDirectriz = puntuaciones.stream().
                        filter(p -> p.getDirectriz().getId().equals(directriz.getId())).toList();
                }
                AuditResult result = new AuditResult();
                result.setId(directriz.getEid());
                result.setNombre(directriz.getNombre());
                result.setDescripcion(directriz.getDescripcion());
                result.setPrioridad(turnPesoIntoString(directriz.getPeso()));

                if (!puntuacionesDirectriz.isEmpty()) {
                    List<String> puntuacionList = new LinkedList<>();
                    List<String> notas = new LinkedList<>();
                    List<String> sugerencias = new LinkedList<>();
                    List<byte[]> imagenes = new LinkedList<>();
                    for (Puntuacion puntuacion : puntuacionesDirectriz) {
                        puntuacionList.add(puntuacion.getUsuario().getNombre() + ": " + puntuacion.getPuntuacion());
                        notas.add(puntuacion.getObservacion());
                        sugerencias.add(puntuacion.getMejora());
                        if (puntuacion.getImagen() != null)
                            imagenes.add(puntuacion.getImagen().getDatosImagen());
                    }
                    result.setPuntuacion(puntuacionList);
                    result.setNotas(notas);
                    result.setSugerencias(sugerencias);
                    if (!imagenes.isEmpty())
                        result.setImagen(imagenes);
                    else {
                        result.setImagen(null);
                    }


                } else {
                    result.setPuntuacion(new LinkedList<>(List.of("No evaluada")));
                    result.setNotas(new LinkedList<>(List.of("No evaluada")));
                    result.setSugerencias(new LinkedList<>(List.of("No evaluada")));
                }
                results.add(result);
            }
        }

        return results;

    }

    private void fillAuditInformation(AuditInformation information, Auditoria auditoria){
        information.setNombre(auditoria.getNombre());
        information.setAplicacion(auditoria.getAplicacion().getNombre());
        information.setCatalogo(auditoria.getCatalogo().getNombre());
        information.setAuditorLider(auditoria.getAdministrador().getNombre());
        List<String> auditores = auditoria.getUsuarios().stream().map(Usuario::getNombre).toList();
        information.setAuditores(auditores.toString());
        Date fechaInicio = auditoria.getFechaInicio();
        Date fechaFinEstimada = auditoria.getFechaFinEstimada();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDateTime localDateTime = fechaInicio.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime();
        String fechainicioString = localDateTime.format(formatter);
        localDateTime = fechaFinEstimada.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime();
        String fechaRealizacion =localDateTime.format(formatter);
        information.setFechaRealizacion(fechainicioString + " - " + fechaRealizacion);
        information.setEvaluacion(auditoria.getEvaluacion().getCodigo());
        information.setObjetivo(auditoria.getDescripcion());
        //El criterio de salida se genera después de todas las comprobaciones pertinentes
    }

    private String turnPesoIntoString(int peso) {
        return switch (peso) {
            case 1 -> "High";
            case 2 -> "Mid";
            case 3 -> "Low";
            default -> "";
        };
    }

    private boolean checkPuntuacion(Puntuacion p, List<ValorPuntuacion> valores, boolean passed) {
        if (passed)
            return valores.stream().filter(valor -> valor.getNombre().equals(p.getPuntuacion()) && valor.isTipo()).count() > 0;
        return valores.stream().filter(valor -> valor.getNombre().equals(p.getPuntuacion()) && !valor.isTipo()).count() > 0;
    }

    public GuidelinesPieChart getPieChart(Long id) {
        Auditoria auditoria = getAuditoria(id);
        List<Puntuacion> puntuaciones = puntuacionService.listByAuditoria(id);
        List<ValorPuntuacion> valorPuntuacion = valorPuntuacionService.
                listValoresByEscala(auditoria.getCatalogo().getEsquema().getId());
        long totalPuntuacion = puntuaciones.size();
        long passed = puntuaciones.stream()
                .filter(puntuacion -> checkPuntuacion(puntuacion, valorPuntuacion, true))
                .count();
        long failed = puntuaciones.stream()
                .filter(puntuacion -> checkPuntuacion(puntuacion, valorPuntuacion, false))
                .count();
        return new GuidelinesPieChart(passed, failed, totalPuntuacion);
    }


    public ScoreGuidelineChart getScoreChart(Long id) {
        Auditoria auditoria = getAuditoria(id);
        List<Puntuacion> puntuaciones = puntuacionService.listByAuditoria(id);
        List<ValorPuntuacion> valorPuntuacion = valorPuntuacionService.
                listValoresByEscala(auditoria.getCatalogo().getEsquema().getId());
        List<String> typePuntuacion = valorPuntuacion.stream().map(ValorPuntuacion::getNombre).toList();
        List<String> data = new LinkedList<>();
        List<String> labelsData = new LinkedList<>();
        for (Puntuacion puntuacion : puntuaciones){
            data.add(puntuacion.getPuntuacion());
            String label = puntuacion.getDirectriz().getEid() + " - " + puntuacion.getDirectriz().getNombre();
            labelsData.add(label);
        }

        return new ScoreGuidelineChart(data, labelsData, typePuntuacion);
    }
}
