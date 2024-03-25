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
    @ManyToOne
    @JoinColumn(name = "ESQUEMA_PUNTUACION")
    private EsquemaPuntuacion escala;
    @Column(name = "tipo", nullable = false)
    private int tipo;
}
