package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.AplicacionMapper;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.dto.AplicacionDTO;
import um.es.usevalia.repository.AplicacionRepository;

import java.util.List;

@Service
public class AplicacionService {

    @Autowired
    AplicacionRepository repository;

    public void addAplicacion(AplicacionDTO aplicacionDTO) {
        Aplicacion applicacion = AplicacionMapper.INSTANCE.aplicacionDTOToAplicacion(aplicacionDTO);
        repository.save(applicacion);
    }

    public void deleteAplicacion(AplicacionDTO aplicacion) {
        repository.delete(AplicacionMapper.INSTANCE.aplicacionDTOToAplicacion(aplicacion));
    }

    public List<AplicacionDTO> listAplicacion() {
        List<Aplicacion> aplicaciones = repository.findAll();
        return aplicaciones.stream()
                .map(AplicacionMapper.INSTANCE::aplicacionToAplicacionDTO).toList();
    }
}
