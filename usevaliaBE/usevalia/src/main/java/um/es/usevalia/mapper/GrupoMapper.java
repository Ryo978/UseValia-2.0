package um.es.usevalia.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.GrupoDTO;
import um.es.usevalia.model.dto.UsuarioDTO;
import um.es.usevalia.service.UsuarioService;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface GrupoMapper {


    @Mapping(source= "usuarios", target = "usuarios")//qualifiedByName = "getUsuariosFromDTO")
     Grupo grupoDTOToGrupo(GrupoDTO grupo, @Context UsuarioService usuarioService);
     GrupoDTO grupoToGrupoDTO(Grupo grupo);

    @AfterMapping
    default void setUsuarios(@MappingTarget Grupo grupo, GrupoDTO grupoDTO, @Context UsuarioService usuarioService) {
        grupo.setUsuarios(usuarioService.getUsuariosFromDTO(grupoDTO.getUsuarios()));
    }

    /*@Named("getUsuariosFromDTO")
    protected List<Usuario> getUsuariosFromDTO(List<UsuarioDTO> usuariosDTO) {
        return usuarioService.getUsuariosFromDTO(usuariosDTO);
    }*/
}
