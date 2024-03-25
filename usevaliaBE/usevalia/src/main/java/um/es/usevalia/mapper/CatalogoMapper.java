package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.repository.UsuarioRepository;

@Mapper
public interface CatalogoMapper {

    CatalogoMapper INSTANCE = Mappers.getMapper(CatalogoMapper.class);

    @Mapping(target = "id", ignore = false)
    @Mapping(target = "autorid", source = "autor.id")
    @Mapping(target = "grupoid", source = "grupo.id")
    @Mapping(target = "esquemaid", source = "esquema.id")
    CatalogoDTO catalogoToCatalogoDTO(Catalogo catalogo);


}
