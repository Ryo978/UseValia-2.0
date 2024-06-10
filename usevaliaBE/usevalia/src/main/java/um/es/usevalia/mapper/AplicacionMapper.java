package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.dto.AplicacionDTO;
import um.es.usevalia.model.enums.Categoria;
import um.es.usevalia.model.enums.Permiso;
import um.es.usevalia.service.CatalogoService;

@Mapper
public interface AplicacionMapper {


    @Mapping(target = "id", ignore = false)
    @Mapping(target = "categoria", source = "categoria.codigo")
    AplicacionDTO aplicacionToAplicacionDTO(Aplicacion aplicacion);

    @Mapping(source = "categoria", target = "categoria", qualifiedByName = "getCategoria")
    Aplicacion aplicacionDTOToAplicacion(AplicacionDTO aplicacionDTO);

    @Named("getCategoria")
    default Categoria getCategoria(String categoria) {
        return Categoria.fromString(categoria);
    }
}
