package um.es.usevalia.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ValorPuntuacionDTO {
    private Long id;

    private String nombre;

    private Long escalaId;

    private boolean tipo;
}
