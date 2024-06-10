package um.es.usevalia.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.Tarea;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuditResult {
    private String id;
    private String nombre;
    private String descripcion;
    private String prioridad;
    private List<String> puntuacion;
    private List<String> notas;
    private List<String> sugerencias;

    private List<byte[]> imagen;

}
