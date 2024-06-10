package um.es.usevalia.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.ValorPuntuacion;
import um.es.usevalia.model.dto.ValorPuntuacionDTO;
import um.es.usevalia.service.EsquemaPuntuacionService;
import um.es.usevalia.service.UsuarioService;

@Component
@Mapper(componentModel = "spring", uses = {EsquemaPuntuacionService.class})
public interface ValorPuntuacionMapper {

    @Mapping(target = "id", ignore = false)
    @Mapping(target = "escalaId", source = "escala.id")
    ValorPuntuacionDTO valorPuntuacionToValorPuntuacionDTO(ValorPuntuacion valorPuntuacion);

    @Mapping(source = "escalaId", target = "escala", qualifiedByName = "mapEscalaIdToEsquemaPuntuacion")
    ValorPuntuacion valorPuntuacionDTOToValorPuntuacion(ValorPuntuacionDTO valorPuntuacion,
                                                        @Context EsquemaPuntuacionService esquemaPuntuacionService);

    /*@AfterMapping
    default void setEscala(@MappingTarget ValorPuntuacion vp,
                             ValorPuntuacionDTO vpdto,
                             @Context EsquemaPuntuacionService esquemaPuntuacionService) {
        vp.setEscala(esquemaPuntuacionService.getEsquemaPuntuacion(vpdto.getEscalaId()));

    }*/
    @Named("mapEscalaIdToEsquemaPuntuacion")
    default EsquemaPuntuacion mapEscalaIdToEsquemaPuntuacion
    (Long escalaId, @Context EsquemaPuntuacionService esquemaPuntuacionService) {
        return esquemaPuntuacionService.getEsquemaPuntuacion(escalaId);
    }

}
