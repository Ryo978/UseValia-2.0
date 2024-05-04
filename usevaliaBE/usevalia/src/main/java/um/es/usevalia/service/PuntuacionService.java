package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.ImagenMapper;
import um.es.usevalia.model.Puntuacion;
import um.es.usevalia.model.dto.ImagenDTO;
import um.es.usevalia.repository.PuntuacionRepository;

import java.util.List;

@Service
public class PuntuacionService {

    @Autowired
    private PuntuacionRepository repository;
    @Autowired
    private ImagenService imagenService;


    public List<Puntuacion> listByAuditoria(Long auditoriaId) {
        return repository.findByAuditoriaId(auditoriaId);
    }

    public void addPuntuacion(Puntuacion puntuacion) {
        repository.save(puntuacion);
    }

    public void deletePuntuacion(Puntuacion puntuacion) {
        repository.delete(puntuacion);
    }

    public void addImage(Long id, ImagenDTO imagenDTO) {
        Puntuacion puntuacion = repository.findById(id).orElse(null);
        if (null != puntuacion.getImagen()){
            imagenService.deleteImagen(puntuacion.getImagen());
        }
        repository.addImage(id, ImagenMapper.INSTANCE.imagenDTOToImagen(imagenDTO));
    }

    public Long getTotalByAudit(Long auditId) {
        return repository.getTotalNumberOfPuntuacionesByAuditoriaId(auditId);
    }

    public List<String> getNamesUserByAudit(Long auditId) {
        return repository.getNamesUserByAudit(auditId);
    }
}
