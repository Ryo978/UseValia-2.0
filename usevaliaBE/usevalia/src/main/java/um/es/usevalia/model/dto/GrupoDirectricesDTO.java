package um.es.usevalia.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrupoDirectricesDTO {
    private Long id;
    private String nombre;
    private Long catalogoid;
}
