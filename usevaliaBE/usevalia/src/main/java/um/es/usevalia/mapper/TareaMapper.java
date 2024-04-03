package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.dto.TareaDTO;

@Mapper
public interface TareaMapper {

    TareaMapper INSTANCE = Mappers.getMapper(TareaMapper.class);

    Tarea tareaDTOToTarea(TareaDTO tarea);

    TareaDTO tareaToTareaDTO(Tarea tarea);
}
