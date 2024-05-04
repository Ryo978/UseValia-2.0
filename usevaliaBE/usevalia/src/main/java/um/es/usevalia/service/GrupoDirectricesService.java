package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.GrupoDirectricesMapper;
import um.es.usevalia.model.GrupoDirectrices;
import um.es.usevalia.model.dto.GrupoDirectricesDTO;
import um.es.usevalia.repository.GrupoDirectricesRepository;

import java.util.List;

@Service
public class GrupoDirectricesService {

    @Autowired
    private GrupoDirectricesRepository repository;

    public GrupoDirectrices getGrupoDirectrices(Long grupoId) {
        return repository.findById(grupoId).orElse(null);
    }

    public void deleteGrupoDirectrices(Long grupoId) {
        repository.deleteById(grupoId);
    }

    public GrupoDirectrices saveGrupoDirectrices(GrupoDirectricesDTO grupoDirectrices) {
        return repository.save(GrupoDirectricesMapper.INSTANCE.grupoDirectricesDTOToGrupoDirectrices(grupoDirectrices));
    }

    public List<GrupoDirectrices> getGrupoDirectricesByCatalogo(Long catalogoId) {
        return repository.findByCatalogo_Id(catalogoId);
    }

}
