package um.es.usevalia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.es.usevalia.model.enums.Permiso;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="catalogo")
public class Catalogo {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "NOMBRE", length = 50, nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "ESQUEMA")
    private EsquemaPuntuacion esquema;

    @ManyToOne
    @JoinColumn(name = "AUTOR")
    private Usuario autor;

    @ManyToOne
    @JoinColumn(name = "GRUPO")
    private Grupo grupo;

    @Enumerated(EnumType.STRING)
    private Permiso lectura;

    @Enumerated(EnumType.STRING)
    private Permiso escritura;


}
