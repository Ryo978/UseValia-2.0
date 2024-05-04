package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.AuditoriaMapper;
import um.es.usevalia.model.Auditoria;
import um.es.usevalia.model.Puntuacion;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.model.enums.Evaluacion;
import um.es.usevalia.repository.AuditoriaRepository;

import java.util.Date;
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
    TareaService tareaService;


    public List<AuditoriaDTO> listAuditoria() {
        return repository.findAll().stream().map(AuditoriaMapper.INSTANCE::auditoriaToAuditoriaDTO).toList();
    }

    public void deleteAuditoria(Long id) {
        List<Puntuacion> puntuaciones = puntuacionService.listByAuditoria(id);
        puntuaciones.forEach(puntuacionService::deletePuntuacion);
        repository.deleteById(id);
    }

    public AuditoriaDTO getAuditoriaDTO(Long id) {
        return AuditoriaMapper.INSTANCE.auditoriaToAuditoriaDTO(getAuditoria(id));
    }

    public Auditoria getAuditoria(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AuditoriaDTO addAuditoria(AuditoriaDTO auditoriaDTO) {
        Auditoria auditoria = AuditoriaMapper.INSTANCE.auditoriaDTOToAuditoria(auditoriaDTO);
        auditoria = repository.save(auditoria);
        auditoriaDTO.setId(auditoria.getId());
        return auditoriaDTO;
    }

    public List<AuditoriaDTO> listByUser(Long userId) {
        return repository.findByUsuario_Id(userId).stream()
                .map(AuditoriaMapper.INSTANCE::auditoriaToAuditoriaDTO)
                .toList();
    }


    public Boolean getEvaluationComplete(Long id) {
        Auditoria auditoria = getAuditoria(id);
        long totalPuntuacion = puntuacionService.getTotalByAudit(id);
        long totalDirectrices = 0;
        switch (auditoria.getEvaluacion()) {
            case BASIC -> totalDirectrices = directrizService.getTotalBasicByCatalog(auditoria.getCatalogo().getId());
            case STANDART -> totalDirectrices = directrizService.getTotalByCatalog(auditoria.getCatalogo().getId());
            case TASKS -> {
                long totalTareas = tareaService.getTotalByCategoria(auditoria.getAplicacion().getCategoria());
                totalDirectrices = directrizService.getTotalByCatalog(auditoria.getCatalogo().getId()) * totalTareas;
            }
            default -> {
            }
        }
        return totalPuntuacion == totalDirectrices;
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
}
