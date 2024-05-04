package um.es.usevalia.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "puntuacion")
public class Puntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "PUNTUACION", nullable = false)
    private String puntuacion;
    @ManyToOne
    @JoinColumn(name = "USUARIO")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "AUDITORIA")
    private Auditoria auditoria;
    @ManyToOne
    @JoinColumn(name = "DIRECTRIZ")
    private Directriz directriz;
    @Column(name = "OBSERVACION", length = 250, nullable = false)
    private String observacion;
    @Column(name = "MEJORA", length = 250, nullable = false)
    private String mejora;
    @ManyToOne
    @JoinColumn(name = "TAREA")
    private Tarea tarea;

    @OneToOne
    @JoinColumn(name = "IMAGEN")
    private Imagen imagen;

}