package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.model.Etiqueta;
import um.es.usevalia.repository.EtiquetaRepository;

import java.util.List;

@Service
public class EtiquetaService {

    @Autowired
    private EtiquetaRepository repository;

    public void deleteEtiqueta(Long etiquetaId) {
        repository.deleteById(etiquetaId);
    }

    public Etiqueta getEtiqueta(Long etiquetaId) {
        return repository.findById(etiquetaId).orElse(null);
    }

    public Etiqueta saveEtiqueta(Etiqueta etiqueta) {
        return repository.save(etiqueta);
    }

    public List<Etiqueta> getByGrupo(Long grupoid) {
        return repository.findByGrupoDirectrices_Id(grupoid);
    }

}
