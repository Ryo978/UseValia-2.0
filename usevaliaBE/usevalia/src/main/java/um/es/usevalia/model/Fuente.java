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
@Table(name = "fuente")
public class Fuente {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long iid;

    @Column(name = "EID", length = 10)
    private String eid;
    @Column(name = "NOMBRE", length = 50)
    private String nombre;
    @Column(name = "DESCRIPCION", length = 250)
    private String descripcion;
    @Column(name = "URL", length = 120)
    private String url;


}
