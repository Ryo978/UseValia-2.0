package um.es.usevalia.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PuntuacionDTO {

    private Long id;
    private int puntuacion;
    private Long usuarioId;

    private Long auditoriaId;

    private Long directrizId;
    private String observacion;

    private String mejora;

    private Long tareaId;

    private Long imagenId;
}
