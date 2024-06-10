package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.repository.EsquemaPuntuacionRepository;

import java.util.List;

@Service
public class EsquemaPuntuacionService {


    @Autowired
    private EsquemaPuntuacionRepository esquemaPuntuacionRepository;

    public EsquemaPuntuacion getEsquemaPuntuacion(Long esquemaid) {
        return esquemaPuntuacionRepository.findById(esquemaid).orElse(null);

    }

    public Long addEsquemaPuntuacion(EsquemaPuntuacion esquemaPuntuacion) {
        return esquemaPuntuacionRepository.save(esquemaPuntuacion).getId();
    }

    public void deleteEsquemaPuntuacion(Long esquemaPuntuacion) {
        esquemaPuntuacionRepository.deleteById(esquemaPuntuacion);
    }

    public List<EsquemaPuntuacion> listEsquemaPuntuacion() {
        return esquemaPuntuacionRepository.findAll();
    }
}
