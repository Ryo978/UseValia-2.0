package um.es.usevalia.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.enums.Categoria;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TareaDTO {

    private Long id;

    private String nombre;

    private Categoria categoria;
}
