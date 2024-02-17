package um.es.usevalia.model;

import jakarta.persistence.*;
import lombok.Data;
import um.es.usevalia.model.enums.Categoria;

@Entity
@Data
@Table(name = "tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "NOMBRE", length = 50, nullable = false)
    private String nombre;

    @Column(name = "CATEGORIA", nullable = false)
    private Categoria categoria;

}
