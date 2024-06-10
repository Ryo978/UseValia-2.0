package um.es.usevalia.mapper;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.*;
import um.es.usevalia.model.dto.PuntuacionDTO;
import um.es.usevalia.service.*;

@Mapper
public interface PuntuacionMapper {



    @Mapping(target = "id", ignore = false)
    @Mapping(target = "usuarioId", source = "usuario.id")
    @Mapping(target = "auditoriaId", source = "auditoria.id")
    @Mapping(target = "directrizId", source = "directriz.id")
    @Mapping(target = "tareaId", source = "tarea.id")
    @Mapping(target = "imagenId", source = "imagen.id")
    PuntuacionDTO puntuacionToPuntuacionDTO(Puntuacion puntuacion);


    @Mapping(source = "usuarioId", target = "usuario", qualifiedByName = "findByIdUsuario")
    @Mapping(source = "auditoriaId", target = "auditoria", qualifiedByName = "findByIdAuditoria")
    @Mapping(source = "directrizId", target = "directriz", qualifiedByName = "findByIdDirectriz")
    @Mapping(source = "tareaId", target = "tarea", qualifiedByName = "findByIdTarea")
    @Mapping(source = "imagenId", target = "imagen", qualifiedByName = "findByIdImagen")
    Puntuacion puntuacionDTOToPuntuacion(PuntuacionDTO puntuacion,
                                         @Context UsuarioService usuarioService,
                                         @Context AuditoriaService auditoriaService,
                                         @Context DirectrizService directrizService,
                                         @Context TareaService tareaService,
                                         @Context ImagenService imagenService);

    @Named("findByIdUsuario")
    default Usuario findByIdUsuario(Long usuarioId, @Context UsuarioService usuarioService) {
        return usuarioService.getUsuario(usuarioId);
    }

    @Named("findByIdAuditoria")
    default Auditoria findByIdAuditoria(Long auditoriaId, @Context AuditoriaService auditoriaService) {
        return auditoriaService.getAuditoria(auditoriaId);
    }

    @Named("findByIdDirectriz")
    default Directriz findByIdDirectriz(Long directrizId, @Context DirectrizService directrizService) {
        return directrizService.getDirectriz(directrizId);
    }

    @Named("findByIdTarea")
    default Tarea findByIdTarea(Long tareaId, @Context TareaService tareaService) {
        return tareaService.getTarea(tareaId);
    }

    @Named("findByIdImagen")
    default Imagen findByIdImagen(Long imagenId, @Context ImagenService imagenService) {
        return imagenService.getImagen(imagenId);
    }

}
