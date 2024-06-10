package um.es.usevalia.mapper;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.Auditoria;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.model.dto.UsuarioDTO;
import um.es.usevalia.model.enums.Categoria;
import um.es.usevalia.model.enums.Evaluacion;
import um.es.usevalia.service.AplicacionService;
import um.es.usevalia.service.CatalogoService;
import um.es.usevalia.service.UsuarioService;

import java.util.List;

@Mapper
public interface AuditoriaMapper {

    @Mapping(source = "administradorId", target = "administrador", qualifiedByName = "findByIdAdministrador")
    @Mapping(source = "aplicacionId", target = "aplicacion", qualifiedByName = "findByIdAplicacion")
    @Mapping(source = "catalogoId", target = "catalogo", qualifiedByName = "findByIdCatalogo")
    @Mapping(source= "usuarios", target = "usuarios", qualifiedByName = "getUsuariosFromDTO")
    @Mapping(source = "evaluacion", target = "evaluacion", qualifiedByName = "getEvaluacion")
    Auditoria auditoriaDTOToAuditoria(AuditoriaDTO auditoria, @Context UsuarioService usuarioService,
                                      @Context AplicacionService aplicacionService,
                                      @Context CatalogoService catalogoService);


    @Mapping(target = "id", ignore = false)
    @Mapping(target = "administradorId", source = "administrador.id")
    @Mapping(target = "aplicacionId", source = "aplicacion.id")
    @Mapping(target = "catalogoId", source = "catalogo.id")
    @Mapping(target = "evaluacion", source = "evaluacion.codigo")
    AuditoriaDTO auditoriaToAuditoriaDTO(Auditoria auditoriaDTO);

    @Named("findByIdAdministrador")
    default Usuario findByIdAdministrador(Long administradorId,
                                          @Context UsuarioService usuarioService) {
        return usuarioService.getUsuario(administradorId);
    }

    @Named("findByIdAplicacion")
    default Aplicacion findByIdAplicacion(Long aplicacionId,
                                          @Context AplicacionService aplicacionService) {
        return aplicacionService.getAplicacion(aplicacionId);
    }

    @Named("findByIdCatalogo")
    default Catalogo findByIdCatalogo(Long catalogoId,
                                      @Context CatalogoService catalogoService) {
        return catalogoService.getCatalogo(catalogoId);
    }

    @Named("getUsuariosFromDTO")
    default List<Usuario> getUsuariosFromDTO(List<UsuarioDTO> usuariosDTO,
                                             @Context UsuarioService usuarioService) {
        return usuarioService.getUsuariosFromDTO(usuariosDTO);
    }

    @Named("getEvaluacion")
    default Evaluacion getEvaluacion(String evaluacion) {
        return Evaluacion.fromString(evaluacion);
    }


}
