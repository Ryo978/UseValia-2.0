package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.ValorPuntuacion;
import um.es.usevalia.model.dto.ValorPuntuacionDTO;
import um.es.usevalia.service.EsquemaPuntuacionService;

@Mapper
public interface ValorPuntuacionMapper {
    ValorPuntuacionMapper INSTANCE = Mappers.getMapper(ValorPuntuacionMapper.class);

    EsquemaPuntuacionService esquemaPuntuacionService = new EsquemaPuntuacionService();

    @Mapping(target = "id", ignore = false)
    @Mapping(target = "escalaId", source = "escala.id")
    ValorPuntuacionDTO valorPuntuacionToValorPuntuacionDTO(ValorPuntuacion valorPuntuacion);

    @Mapping(source = "escalaId", target = "escala", qualifiedByName = "findByIdEsquema")
    ValorPuntuacion valorPuntuacionDTOToValorPuntuacion(ValorPuntuacionDTO valorPuntuacion);

    @Named("findByIdEsquema")
    default EsquemaPuntuacion findByIdEsquema(Long escalaId) {
        return esquemaPuntuacionService.getEsquemaPuntuacion(escalaId);
    }

}
