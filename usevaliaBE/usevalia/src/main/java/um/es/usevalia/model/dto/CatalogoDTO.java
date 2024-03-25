package um.es.usevalia.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.enums.Permiso;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CatalogoDTO {

    private Long id;
    private String nombre;
    private Long esquemaid;
    private Long autorid;
    private Long grupoid;
    private Permiso lectura;
    private Permiso escritura;

}
