package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.dto.ImagenDTO;

@Mapper
public interface ImagenMapper {

    ImagenMapper INSTANCE = Mappers.getMapper(ImagenMapper.class);

    ImagenDTO imagenToImagenDTO(Imagen imagen);

    Imagen imagenDTOToImagen(ImagenDTO imagen);
}
