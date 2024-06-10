package um.es.usevalia.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuditInformation {
    private String nombre;
    private String aplicacion;
    private String catalogo;
    private String auditorLider;
    private String auditores;
    private String fechaRealizacion;
    private String evaluacion;
    private String objetivo;
    private String criteriosSalida;
}
