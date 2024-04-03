package um.es.usevalia.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "directriz")
public class Directriz {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "EID", length = 10)
    private String eid;
    @Column(name = "NOMBRE", length = 50)
    private String nombre;

    @Column(name = "DESCRIPCION", length = 250)
    private String descripcion;

    @Column(name = "PESO")
    private int peso; //TODO: esto en principio es una clase Prioridad, mandar correo para confirmar.

    @ManyToOne
    @JoinColumn(name = "PADRE")
    private Directriz padre;

    @ManyToOne
    private GrupoDirectrices grupo;

    @ManyToOne
    private EsquemaPuntuacion esquema;

    /*@ManyToOne
    @JoinColumn(name = "FUENTE")
    private Fuente fuente;
    */ //TODO: saber si es one to many, o many to one, y que funcionalidad tiene.


}
