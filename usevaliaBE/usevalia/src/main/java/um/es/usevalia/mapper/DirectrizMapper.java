package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Directriz;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.GrupoDirectrices;
import um.es.usevalia.model.dto.DirectrizDTO;
import um.es.usevalia.service.DirectrizService;
import um.es.usevalia.service.EsquemaPuntuacionService;
import um.es.usevalia.service.GrupoDirectricesService;

@Mapper
public interface DirectrizMapper {

    DirectrizMapper INSTANCE = Mappers.getMapper(DirectrizMapper.class);

    DirectrizService directrizService = new DirectrizService();
    GrupoDirectricesService grupoDirectricesService = new GrupoDirectricesService();
    EsquemaPuntuacionService esquemaPuntuacionService = new EsquemaPuntuacionService();

    @Mapping(target = "id", ignore = false)
    @Mapping(target = "padreId", source = "padre.id")
    @Mapping(target = "grupoId", source = "grupo.id")
    @Mapping(target = "esquemaId", source = "esquema.id")
    //@Mapping(target = "fuenteId", source = "fuente.id")
    DirectrizDTO directrizToDirectrizDTO(Directriz directriz);

    @Mapping(source = "padreId", target = "padre", qualifiedByName = "findByIdDirectriz")
    @Mapping(source = "grupoId", target = "grupo", qualifiedByName = "findByIdGrupo")
    @Mapping(source = "esquemaId", target = "esquema", qualifiedByName = "findByIdEsquema")
    Directriz directrizDTOToDirectriz(DirectrizDTO directriz);

    @Named("findByIdDirectriz")
    default Directriz findByIdDirectriz(Long padreId) {
        return directrizService.getDirectriz(padreId);
    }
    @Named("findByIdGrupo")
    default GrupoDirectrices findByIdGrupo(Long grupoId) {
        return grupoDirectricesService.getGrupoDirectrices(grupoId);
    }
    @Named("findByIdEsquema")
    default EsquemaPuntuacion findByIdEsquema(Long esquemaId) {
        return esquemaPuntuacionService.getEsquemaPuntuacion(esquemaId);
    }


}
