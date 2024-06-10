package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Etiqueta;
import um.es.usevalia.model.dto.EtiquetaDTO;

@Mapper
public interface EtiquetaMapper {

    EtiquetaDTO etiquetaToEtiquetaDTO(Etiqueta etiqueta);

    Etiqueta etiquetaDTOToEtiqueta(EtiquetaDTO etiqueta);
}
