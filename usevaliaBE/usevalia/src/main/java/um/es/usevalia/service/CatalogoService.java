package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.CatalogoMapper;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.repository.CatalogoRepository;

import java.util.List;

@Service
public class CatalogoService {

    @Autowired
    private CatalogoRepository repository;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private EsquemaPuntuacionService esquemaPuntuacionService;
    @Autowired
    private GrupoService grupoService;

    public void addCatalogo(CatalogoDTO catalogoDTO) {
        repository.save(convertDTOToEntity(catalogoDTO));
    }

    public void deleteCatalogo(CatalogoDTO catalogoDTO) {
        repository.delete(convertDTOToEntity(catalogoDTO));
    }

    public List<CatalogoDTO> listCatalogo() {
        List<Catalogo> catalogos = repository.findAll();
        return catalogos.stream().map(CatalogoMapper.INSTANCE::catalogoToCatalogoDTO).toList();
    }

    private Catalogo convertDTOToEntity(CatalogoDTO catalogoDTO) {
        Usuario usuario = usuarioService.getUsuario(catalogoDTO.getAutorid());
        EsquemaPuntuacion esquemaPuntuacion = esquemaPuntuacionService.
                getEsquemaPuntuacion(catalogoDTO.getEsquemaid());
        Grupo grupo = grupoService.getGrupo(catalogoDTO.getGrupoid());
        return new Catalogo (catalogoDTO.getId(), catalogoDTO.getNombre(), esquemaPuntuacion, usuario,
                grupo, catalogoDTO.getLectura(), catalogoDTO.getEscritura());
    }
}
