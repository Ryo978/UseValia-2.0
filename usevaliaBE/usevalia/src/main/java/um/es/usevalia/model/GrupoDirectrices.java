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
@Table(name = "grupo_directrices")
public class GrupoDirectrices {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    private String nombre;
    @ManyToOne
    @JoinColumn(name = "CATALOGO")
    private Catalogo catalogo;

    @ManyToOne
    @JoinColumn(name = "ESQUEMA")
    private EsquemaPuntuacion esquema;


}
