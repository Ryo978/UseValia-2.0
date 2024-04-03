package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.repository.UsuarioRepository;
import um.es.usevalia.service.EsquemaPuntuacionService;
import um.es.usevalia.service.GrupoService;
import um.es.usevalia.service.UsuarioService;

@Mapper
public interface CatalogoMapper {

    CatalogoMapper INSTANCE = Mappers.getMapper(CatalogoMapper.class);

    GrupoService grupoService = new GrupoService();
    UsuarioService usuarioService = new UsuarioService();
    EsquemaPuntuacionService esquemaPuntuacionService = new EsquemaPuntuacionService();

    @Mapping(target = "id", ignore = false)
    @Mapping(target = "autorid", source = "autor.id")
    @Mapping(target = "grupoid", source = "grupo.id")
    @Mapping(target = "esquemaid", source = "esquema.id")
    CatalogoDTO catalogoToCatalogoDTO(Catalogo catalogo);

    @Mapping(source = "grupoId", target = "grupo", qualifiedByName = "findByIdGrupo")
    @Mapping(source = "esquemaId", target = "esquema", qualifiedByName = "findByIdEsquema")
    @Mapping(source = "autorId", target = "autor", qualifiedByName = "findByIdAutor")
    Catalogo catalogoDTOToCatalogo(CatalogoDTO catalogo);

    @Named("findByIdGrupo")
    default Grupo findByIdGrupo(Long grupoId) {
        return grupoService.getGrupo(grupoId);
    }

    @Named("findByIdEsquema")
    default EsquemaPuntuacion findByIdEsquema(Long esquemaId) {
        return esquemaPuntuacionService.getEsquemaPuntuacion(esquemaId);
    }

    @Named("findByIdAutor")
    default Usuario findByIdAutor(Long autorId) {
        return usuarioService.getUsuario(autorId);
    }


}
