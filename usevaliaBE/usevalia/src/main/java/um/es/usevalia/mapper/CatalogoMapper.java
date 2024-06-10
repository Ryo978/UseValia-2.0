package um.es.usevalia.mapper;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.model.enums.Permiso;
import um.es.usevalia.repository.UsuarioRepository;
import um.es.usevalia.service.EsquemaPuntuacionService;
import um.es.usevalia.service.GrupoService;
import um.es.usevalia.service.UsuarioService;

@Component
@Mapper(componentModel = "spring", uses = {EsquemaPuntuacionService.class, GrupoService.class, UsuarioService.class})
public interface CatalogoMapper {


    @Mapping(target = "id", ignore = false)
    @Mapping(target = "autorid", source = "autor.id")
    @Mapping(target = "grupoid", source = "grupo.id")
    @Mapping(target = "esquemaid", source = "esquema.id")
    @Mapping(target = "lectura", source = "lectura.codigo")
    @Mapping(target = "escritura", source = "escritura.codigo")
    CatalogoDTO catalogoToCatalogoDTO(Catalogo catalogo);

    @Mapping(source = "grupoid", target = "grupo", qualifiedByName = "findByIdGrupo")
    @Mapping(source = "esquemaid", target = "esquema", qualifiedByName = "findByIdEsquema")
    @Mapping(source = "autorid", target = "autor", qualifiedByName = "findByIdAutor")
    @Mapping(source = "lectura", target = "lectura", qualifiedByName = "GetPermiso")
    @Mapping(source = "escritura", target = "escritura", qualifiedByName = "GetPermiso")
    Catalogo catalogoDTOToCatalogo(CatalogoDTO catalogo,
                                   @Context UsuarioService usuarioService,
                                   @Context GrupoService grupoService,
                                   @Context EsquemaPuntuacionService esquemaPuntuacionService);

    @Named("GetPermiso")
    default Permiso getPermiso(String permiso) {
        return Permiso.fromString(permiso);
    }
    @Named("findByIdGrupo")
    default Grupo findByIdGrupo(Long grupoId, @Context GrupoService grupoService) {
        return grupoService.getGrupo(grupoId);
    }

    @Named("findByIdEsquema")
    default EsquemaPuntuacion findByIdEsquema(Long esquemaId,
                                              @Context EsquemaPuntuacionService esquemaPuntuacionService) {
        return esquemaPuntuacionService.getEsquemaPuntuacion(esquemaId);
    }

    @Named("findByIdAutor")
    default Usuario findByIdAutor(Long autorId, @Context UsuarioService usuarioService)  {
        return usuarioService.getUsuario(autorId);
    }


}
