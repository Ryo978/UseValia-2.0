package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.dto.TareaDTO;
import um.es.usevalia.model.enums.Categoria;

@Mapper
public interface TareaMapper {


    @Mapping(target = "categoria", source = "categoria", qualifiedByName = "getCategoria")
    Tarea tareaDTOToTarea(TareaDTO tarea);

    @Mapping(target = "categoria", source = "categoria.codigo")
    TareaDTO tareaToTareaDTO(Tarea tarea);

    @Named("getCategoria")
    default Categoria getCategoria(String categoria) {
        return Categoria.fromString(categoria);
    }
}
