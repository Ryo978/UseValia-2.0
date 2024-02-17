package um.es.usevalia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "prioridad")
public class Prioridad {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;
    @ManyToOne
    @JoinColumn(name = "CATALOGO")
    private Catalogo catalogo;
    @Column(name = "peso", nullable = false)
    private int peso;
    @Column(name = "fallos", nullable = false)
    private int fallos;
}
