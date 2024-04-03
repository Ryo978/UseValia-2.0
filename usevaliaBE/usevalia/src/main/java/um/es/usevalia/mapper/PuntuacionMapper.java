package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.*;
import um.es.usevalia.model.dto.PuntuacionDTO;
import um.es.usevalia.service.*;

@Mapper
public interface PuntuacionMapper {

    PuntuacionMapper INSTANCE = Mappers.getMapper(PuntuacionMapper.class);

    UsuarioService usuarioService = new UsuarioService();
    AuditoriaService auditoriaService = new AuditoriaService();
    DirectrizService directrizService = new DirectrizService();
    TareaService tareaService = new TareaService();

    ImagenService imagenService = new ImagenService();


    @Mapping(target = "id", ignore = false)
    @Mapping(target = "usuarioId", source = "usuario.id")
    @Mapping(target = "auditoriaId", source = "auditoria.id")
    @Mapping(target = "DirectrizId", source = "directriz.id")
    @Mapping(target = "tareaId", source = "tarea.id")
    @Mapping(target = "imagenId", source = "imagen.id")
    PuntuacionDTO puntuacionToPuntuacionDTO(Puntuacion puntuacion);


    @Mapping(source = "usuarioId", target = "usuario", qualifiedByName = "findByIdUsuario")
    @Mapping(source = "auditoriaId", target = "auditoria", qualifiedByName = "findByIdAuditoria")
    @Mapping(source = "DirectrizId", target = "directriz", qualifiedByName = "findByIdDirectriz")
    @Mapping(source = "tareaId", target = "tarea", qualifiedByName = "findByIdTarea")
    @Mapping(source = "imagenId", target = "imagen", qualifiedByName = "findByIdImagen")
    Puntuacion puntuacionDTOToPuntuacion(PuntuacionDTO puntuacion);

    @Named("findByIdUsuario")
    default Usuario findByIdUsuario(Long usuarioId) {
        return usuarioService.getUsuario(usuarioId);
    }

    @Named("findByIdAuditoria")
    default Auditoria findByIdAuditoria(Long auditoriaId) {
        return auditoriaService.getAuditoria(auditoriaId);
    }

    @Named("findByIdDirectriz")
    default Directriz findByIdDirectriz(Long directrizId) {
        return directrizService.getDirectriz(directrizId);
    }

    @Named("findByIdTarea")
    default Tarea findByIdTarea(Long tareaId) {
        return tareaService.getTarea(tareaId);
    }

    @Named("findByIdImagen")
    default Imagen findByIdImagen(Long imagenId) {
        return imagenService.getImagen(imagenId);
    }

}
