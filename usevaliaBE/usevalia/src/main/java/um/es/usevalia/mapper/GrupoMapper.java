package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.dto.GrupoDTO;

@Mapper
public interface GrupoMapper {

    GrupoMapper INSTANCE = Mappers.getMapper(GrupoMapper.class);

    Grupo grupoDTOToGrupo(GrupoDTO grupo);
    GrupoDTO grupoToGrupoDTO(Grupo grupo);
}
