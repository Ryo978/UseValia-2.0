package um.es.usevalia.model.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.enums.Categoria;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class AplicacionDTO {

    private Long id;
    private String nombre;
    private String url;
    private String descripcion;
    private Categoria categoria;
}
