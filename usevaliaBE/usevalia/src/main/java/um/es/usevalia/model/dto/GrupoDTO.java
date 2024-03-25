package um.es.usevalia.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.Etiqueta;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class GrupoDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private List<EtiquetaDTO> etiquetas;
    private List<UsuarioDTO> usuarios;
}
