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
    EsquemaPuntuacionService esquemaPuntuacionService = new EsquemaPuntuacionService();

    @Mapping(source = "catalogoId", target = "catalogo", qualifiedByName = "findByIdCatalogo")
    @Mapping(source = "esquemaId", target = "esquema", qualifiedByName = "findByIdEsquema")
    GrupoDirectrices grupoDirectricesDTOToGrupoDirectrices(GrupoDirectricesDTO grupoDirectrices);
    @Mapping(source = "catalogo.id", target = "catalogoId")
    @Mapping(source = "esquema.id", target = "esquemaId")
    GrupoDirectricesDTO grupoDirectricesToGrupoDirectricesDTO(GrupoDirectrices grupoDirectrices);

    @Named("findByIdCatalogo")
    default Catalogo findByIdCatalogo(Long catalogoId) {
        return catalogoService.getCatalogo(catalogoId);
    }

    @Named("findByIdEsquema")
    default EsquemaPuntuacion findByIdEsquema(Long esquemaId) {
        return esquemaPuntuacionService.getEsquemaPuntuacion(esquemaId);
    }

}
