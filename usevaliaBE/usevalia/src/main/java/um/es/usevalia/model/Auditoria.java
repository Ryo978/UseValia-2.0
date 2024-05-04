package um.es.usevalia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.enums.Evaluacion;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="auditoria")
public class Auditoria {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "DESCRIPCION", length = 250, nullable = false)
    private String descripcion;

    @Column(name = "FECHA_INICIO", length = 250, nullable = false)
    private Date fechaInicio;

    @Column(name = "FECHA_FIN_ESTIMADA", length = 250, nullable = false)
    private Date fechaFinEstimada;

    @Column(name = "FECHA_FIN_REAL", length = 250, nullable = false)
    private Date fechaFinReal;

    @JoinColumn(name = "APLICACION", nullable = false)
    @ManyToOne
    private Aplicacion aplicacion;

    @ManyToOne
    @JoinColumn(name = "ADMINISTRATOR", nullable = false)
    private Usuario administrador;

    @ManyToOne
    @JoinColumn(name = "CATALOGO", nullable = false)
    private Catalogo catalogo;

    @Column(name = "EVALUACION", length = 25)
    private Evaluacion evaluacion;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "USUARIOS",
            joinColumns = @JoinColumn(name = "AUDITORIA_ID"),
            inverseJoinColumns = @JoinColumn(name = "USUARIO_ID")
    )

    private List<Usuario> usuarios;






}
