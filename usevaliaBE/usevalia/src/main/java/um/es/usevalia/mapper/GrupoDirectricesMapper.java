package um.es.usevalia.mapper;

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
    GrupoDirectricesMapper INSTANCE = Mappers.getMapper(GrupoDirectricesMapper.class);

    CatalogoService catalogoService = new CatalogoService();

    @Mapping(source = "catalogoId", target = "catalogo", qualifiedByName = "findByIdCatalogo")
    GrupoDirectrices grupoDirectricesDTOToGrupoDirectrices(GrupoDirectricesDTO grupoDirectrices);
    @Mapping(source = "catalogo.id", target = "catalogoId")
    GrupoDirectricesDTO grupoDirectricesToGrupoDirectricesDTO(GrupoDirectrices grupoDirectrices);

    @Named("findByIdCatalogo")
    default Catalogo findByIdCatalogo(Long catalogoId) {
        return catalogoService.getCatalogo(catalogoId);
    }


}
