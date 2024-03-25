package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.data.elasticsearch.annotations.Mapping;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.dto.AplicacionDTO;

@Mapper
public interface AplicacionMapper {

    AplicacionMapper INSTANCE = Mappers.getMapper(AplicacionMapper.class);

    AplicacionDTO aplicacionToAplicacionDTO(Aplicacion aplicacion);

    Aplicacion aplicacionDTOToAplicacion(AplicacionDTO aplicacionDTO);
}
