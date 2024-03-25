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
@Table(name = "esquema-puntuacion")
public class EsquemaPuntuacion {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String nombre;

    @Column(name = "descripcion", length = 250, nullable = false)
    private String descripcion;



}
