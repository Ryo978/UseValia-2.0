package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.DirectrizMapper;
import um.es.usevalia.model.Directriz;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.GrupoDirectrices;
import um.es.usevalia.model.dto.DirectrizDTO;
import um.es.usevalia.repository.DirectrizRepository;

import java.util.List;

@Service
public class DirectrizService {

    @Autowired
    private DirectrizRepository repository;
    @Autowired
    private GrupoDirectricesService grupoDirectricesService;
    @Autowired
    private EsquemaPuntuacionService esquemaPuntuacionService;


    public List<DirectrizDTO> listByGrupo(Long grupoid) {
        return repository.listByGrupo(grupoid).stream()
                .map(DirectrizMapper.INSTANCE::directrizToDirectrizDTO).toList();
    }

    public void addDirectriz(DirectrizDTO directrizDTO) {
        repository.save(convertDTOtoEntity(directrizDTO));
    }
    public void deleteDirectriz(DirectrizDTO directrizDTO) {
        repository.delete(convertDTOtoEntity(directrizDTO));
    }

    public Directriz getDirectriz(Long directrizId) {
        return repository.findById(directrizId).orElse(null);
    }
    public DirectrizDTO getDirectrizDTO(Long directrizId) {
        return DirectrizMapper.INSTANCE.directrizToDirectrizDTO(getDirectriz(directrizId));
    }

    public Long getTotalBasicByCatalog(Long catalogId) {
        return repository.getTotalBasicByCatalog(catalogId);
    }

    public Long getTotalByCatalog(Long catalogId) {
        return repository.getTotalByCatalog(catalogId);
    }

    private Directriz convertDTOtoEntity(DirectrizDTO directrizDTO) {
        GrupoDirectrices grupo = grupoDirectricesService.getGrupoDirectrices(directrizDTO.getGrupoId());
        EsquemaPuntuacion esquema = esquemaPuntuacionService.getEsquemaPuntuacion(directrizDTO.getEsquemaId());

        return new Directriz(directrizDTO.getId(), directrizDTO.getEid(), directrizDTO.getNombre(),
                directrizDTO.getDescripcion(), directrizDTO.getPeso(), grupo, esquema);
    }


    public void multipleAddDirectriz(List<DirectrizDTO> directrizDTOList) {
        for (DirectrizDTO directrizDTO : directrizDTOList) {
            addDirectriz(directrizDTO);
        }
    }
}
