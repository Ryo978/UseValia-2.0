package um.es.usevalia.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class DirectrizDTO {

    private Long id;

    private String eid;

    private String nombre;

    private String descripcion;

    private int peso;
    private Long grupoId;

    private Long esquemaId;

    //private Long fuente; TODO: Completar primero funcionalidad en la entidad.
}
