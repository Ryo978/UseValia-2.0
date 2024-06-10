package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.AplicacionMapper;
import um.es.usevalia.mapper.AplicacionMapperImpl;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.dto.AplicacionDTO;
import um.es.usevalia.repository.AplicacionRepository;

import java.util.LinkedList;
import java.util.List;

@Service
public class AplicacionService {

    @Autowired
    AplicacionRepository repository;

    AplicacionMapper mapper = new AplicacionMapperImpl();

    public void addAplicacion(AplicacionDTO aplicacionDTO) {
        Aplicacion applicacion = mapper.aplicacionDTOToAplicacion(aplicacionDTO);
        repository.save(applicacion);
    }

    public void deleteAplicacion(Long id) {
        repository.deleteById(id);
    }

    public List<AplicacionDTO> listAplicacion() {
        List<Aplicacion> aplicaciones = repository.findAll();
        if (aplicaciones.isEmpty()) {
            return new LinkedList<>();
        }
        return aplicaciones.stream()
                .map(mapper::aplicacionToAplicacionDTO).toList();
    }

    public Aplicacion getAplicacion(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AplicacionDTO getAplicacionDTO(Long id) {
        return mapper.aplicacionToAplicacionDTO(getAplicacion(id));
    }

    public Boolean isEditable(Long aplicacionId) {
        return repository.isEditable(aplicacionId) == null;
    }
}
