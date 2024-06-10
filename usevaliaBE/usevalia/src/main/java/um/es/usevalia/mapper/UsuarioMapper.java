package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.UsuarioDTO;

@Mapper
public interface UsuarioMapper {


    @Mapping(target = "id", ignore = false)
    UsuarioDTO usuarioToUsuarioDTO(Usuario usuario);

    Usuario usuarioDTOToUsuario(UsuarioDTO usuarioDTO);
}
