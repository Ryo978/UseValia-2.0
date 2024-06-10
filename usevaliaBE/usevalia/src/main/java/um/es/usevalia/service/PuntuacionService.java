package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.ImagenMapper;
import um.es.usevalia.mapper.ImagenMapperImpl;
import um.es.usevalia.mapper.PuntuacionMapper;
import um.es.usevalia.mapper.PuntuacionMapperImpl;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.Puntuacion;
import um.es.usevalia.model.dto.ImagenDTO;
import um.es.usevalia.model.dto.PuntuacionDTO;
import um.es.usevalia.repository.PuntuacionRepository;

import java.util.List;

@Service
public class PuntuacionService {

    @Autowired
    private PuntuacionRepository repository;
    @Autowired
    private ImagenService imagenService;

    PuntuacionMapper mapper = new PuntuacionMapperImpl();
    ImagenMapper imagenMapper = new ImagenMapperImpl();


    public List<Puntuacion> listByAuditoria(Long auditoriaId) {
        return repository.findByAuditoriaId(auditoriaId);
    }

    public PuntuacionDTO addPuntuacion(Puntuacion puntuacion) {
        return mapper.puntuacionToPuntuacionDTO(repository.save(puntuacion));
    }

    public void deletePuntuacion(Puntuacion puntuacion) {
        repository.delete(puntuacion);
    }

    public void addImage(Long id, ImagenDTO imagenDTO) {
        Puntuacion puntuacion = repository.findById(id).orElse(null);
        if (null != puntuacion.getImagen()){
            imagenService.deleteImagen(puntuacion.getImagen());
        }
        Imagen img = imagenService.addImagen(imagenMapper.imagenDTOToImagen(imagenDTO));
        puntuacion.setImagen(img);
        repository.save(puntuacion);
    }

    public Long getTotalByAudit(Long auditId) {
        return repository.getTotalNumberOfPuntuacionesByAuditoriaId(auditId);
    }

    public List<String> getNamesUserByAudit(Long auditId) {
        return repository.getNamesUserByAudit(auditId);
    }

    public List<Puntuacion> listByUser(Long userId, Long auditId) {
        return repository.findByUserId(userId, auditId);
    }

    public List<Puntuacion> listByTask(Long userId, Long taskId, Long auditId) {
        return repository.findByUserIdAndTaskId(userId, taskId, auditId);
    }

    public Imagen getImagen(Long idPuntuacion) {
        return imagenService.getImagenByPuntuacion(idPuntuacion);
    }
}
