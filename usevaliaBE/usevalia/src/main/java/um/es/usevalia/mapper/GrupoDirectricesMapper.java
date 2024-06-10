package um.es.usevalia.mapper;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.GrupoDirectrices;
import um.es.usevalia.model.dto.GrupoDirectricesDTO;
import um.es.usevalia.service.CatalogoService;
import um.es.usevalia.service.EsquemaPuntuacionService;

@Mapper
public interface GrupoDirectricesMapper {


    @Mapping(source = "catalogoid", target = "catalogo", qualifiedByName = "findByIdCatalogo")
    GrupoDirectrices grupoDirectricesDTOToGrupoDirectrices(GrupoDirectricesDTO grupoDirectrices,
                                                           @Context CatalogoService catalogoService);
    @Mapping(source = "catalogo.id", target = "catalogoid")
    GrupoDirectricesDTO grupoDirectricesToGrupoDirectricesDTO(GrupoDirectrices grupoDirectrices);

    @Named("findByIdCatalogo")
    default Catalogo findByIdCatalogo(Long catalogoId, @Context CatalogoService catalogoService) {
        return catalogoService.getCatalogo(catalogoId);
    }


}
