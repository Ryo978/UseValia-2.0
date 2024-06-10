package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.CatalogoMapper;
import um.es.usevalia.mapper.CatalogoMapperImpl;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.model.enums.Permiso;
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

    private CatalogoMapper mapper = new CatalogoMapperImpl();

    public CatalogoDTO addCatalogo(CatalogoDTO catalogoDTO) {
       Catalogo catalogo = repository.save(mapper.catalogoDTOToCatalogo(catalogoDTO,
               usuarioService, grupoService, esquemaPuntuacionService));
       return mapper.catalogoToCatalogoDTO(catalogo);
    }

    public void deleteCatalogo(CatalogoDTO catalogoDTO) {
        repository.delete(mapper.catalogoDTOToCatalogo(catalogoDTO,
                usuarioService, grupoService, esquemaPuntuacionService));
    }

    public Catalogo getCatalogo(Long catalogoId) {
        return repository.findById(catalogoId).orElse(null);
    }

    public List<CatalogoDTO> listCatalogo() {
        List<Catalogo> catalogos = repository.findAll();
        return catalogos.stream().map(mapper::catalogoToCatalogoDTO).toList();
    }
    public CatalogoDTO getCatalogoDTO(Long catalogoId) {
        return mapper.catalogoToCatalogoDTO(getCatalogo(catalogoId));
    }

    private Catalogo convertDTOToEntity(CatalogoDTO catalogoDTO) {
        Usuario usuario = usuarioService.getUsuario(catalogoDTO.getAutorid());
        EsquemaPuntuacion esquemaPuntuacion = esquemaPuntuacionService.
                getEsquemaPuntuacion(catalogoDTO.getEsquemaid());
        Grupo grupo = grupoService.getGrupo(catalogoDTO.getGrupoid());
        return new Catalogo (catalogoDTO.getId(), catalogoDTO.getNombre(), esquemaPuntuacion, usuario,
                grupo, Permiso.valueOf(catalogoDTO.getLectura()), Permiso.valueOf(catalogoDTO.getEscritura()));
    }
    private boolean isSelectedLectura(Long userId, Catalogo catalogo) {
        if (catalogo.getLectura() == null) return true;
        return catalogo.getLectura().equals(Permiso.PUBLICO) ||
                (catalogo.getLectura().equals(Permiso.PRIVADO) && catalogo.getAutor().getId().equals(userId)) ||
                (catalogo.getLectura().equals(Permiso.GRUPO) && catalogo.getGrupo().getUsuarios().stream()
                        .filter(usuario -> usuario.getId().equals(userId)).count() > 0);

    }

    private boolean isSelectedEscritura(Long userId, Catalogo catalogo) {
        if (catalogo.getEscritura() == null) return true;
        return catalogo.getEscritura().equals(Permiso.PUBLICO) ||
                (catalogo.getEscritura().equals(Permiso.PRIVADO) && catalogo.getAutor().getId().equals(userId)) ||
                (catalogo.getEscritura().equals(Permiso.GRUPO) && catalogo.getGrupo().getUsuarios().stream()
                        .filter(usuario -> usuario.getId().equals(userId)).count() > 0);

    }
    public List<CatalogoDTO> listCatalogoByLectura(Long userId) {
        List<Catalogo> catalogos = repository.findAll();
        return catalogos.stream().filter(catalogo -> isSelectedLectura(userId, catalogo))
        .map(mapper::catalogoToCatalogoDTO).toList();
    }

    public List<CatalogoDTO> listCatalogoByEscritura(Long userId) {
        List<Catalogo> catalogos = repository.findAll();
        return catalogos.stream().filter(catalogo -> isSelectedEscritura(userId, catalogo))
                .map(mapper::catalogoToCatalogoDTO).toList();
    }
}
