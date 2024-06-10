package um.es.usevalia.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.enums.Evaluacion;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class AuditoriaDTO {

    private Long id;

    private String nombre;

    private String descripcion;

    private Date fechaInicio;

    private Date fechaFinEstimada;

    private Date fechaFinReal;

    private Long aplicacionId;

    private Long administradorId;

    private Long catalogoId;

    private String evaluacion;

    private List<UsuarioDTO> usuarios;
}
