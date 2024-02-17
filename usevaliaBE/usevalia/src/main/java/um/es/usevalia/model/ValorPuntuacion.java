package um.es.usevalia.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "valor_puntuacion")
public class ValorPuntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;
    @Column(name = "escala", nullable = false)
    private int escala;
    @Column(name = "tipo", nullable = false)
    private int tipo;
}
