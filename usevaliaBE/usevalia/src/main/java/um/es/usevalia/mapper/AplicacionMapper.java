package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.dto.AplicacionDTO;
import um.es.usevalia.service.CatalogoService;

@Mapper
public interface AplicacionMapper {

    AplicacionMapper INSTANCE = Mappers.getMapper(AplicacionMapper.class);

    CatalogoService catalogoService = new CatalogoService();

    @Mapping(target = "id", ignore = false)
    @Mapping(target = "catalogoId", source = "catalogo.id")
    AplicacionDTO aplicacionToAplicacionDTO(Aplicacion aplicacion);

    @Mapping(source = "catalogoId", target = "catalogo", qualifiedByName = "findByIdCatalogo")
    Aplicacion aplicacionDTOToAplicacion(AplicacionDTO aplicacionDTO);

    @Named("findByIdCatalogo")
    default Catalogo findByIdCatalogo(Long catalogoId) {
        return catalogoService.getCatalogo(catalogoId);
    }
}
