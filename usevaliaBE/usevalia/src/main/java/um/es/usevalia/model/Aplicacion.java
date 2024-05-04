package um.es.usevalia.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import um.es.usevalia.model.enums.Categoria;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@OnDelete(action = OnDeleteAction.CASCADE)
@Table(name="aplicacion")
public class Aplicacion {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "NOMBRE", length = 50, nullable = false)
    private String nombre;

    @Column(name = "URL", length = 120, nullable = false)
    private String url;

    @Column(name = "DESCRIPCION", length = 250)
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

}
