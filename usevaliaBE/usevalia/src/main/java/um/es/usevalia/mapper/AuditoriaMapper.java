package um.es.usevalia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.Auditoria;
import um.es.usevalia.model.Catalogo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.service.AplicacionService;
import um.es.usevalia.service.CatalogoService;
import um.es.usevalia.service.UsuarioService;

@Mapper
public interface AuditoriaMapper {

    AuditoriaMapper INSTANCE = Mappers.getMapper(AuditoriaMapper.class);

    AplicacionService aplicacionService = new AplicacionService();
    CatalogoService catalogoService = new CatalogoService();
    UsuarioService usuarioService = new UsuarioService();

    @Mapping(source = "administradorId", target = "administrador", qualifiedByName = "findByIdAdministrador")
    @Mapping(source = "aplicacionId", target = "aplicacion", qualifiedByName = "findByIdAplicacion")
    @Mapping(source = "catalogoId", target = "catalogo", qualifiedByName = "findByIdCatalogo")
    Auditoria auditoriaDTOToAuditoria(AuditoriaDTO auditoria);


    @Mapping(target = "id", ignore = false)
    @Mapping(target = "administradorid", source = "administrador.id")
    @Mapping(target = "aplicacionid", source = "aplicacion.id")
    @Mapping(target = "catalogoid", source = "catalogo.id")
    AuditoriaDTO auditoriaToAuditoriaDTO(Auditoria auditoriaDTO);

    @Named("findByIdAdministrador")
    default Usuario findByIdAdministrador(Long administradorId) {
        return usuarioService.getUsuario(administradorId);
    }

    @Named("findByIdAplicacion")
    default Aplicacion findByIdAplicacion(Long aplicacionId) {
        return aplicacionService.getAplicacion(aplicacionId);
    }

    @Named("findByIdCatalogo")
    default Catalogo findByIdCatalogo(Long catalogoId) {
        return catalogoService.getCatalogo(catalogoId);
    }


}
