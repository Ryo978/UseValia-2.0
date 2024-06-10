package um.es.usevalia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "grupo")
public class Grupo {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "NOMBRE", length = 50, nullable = false)
    private String nombre;

    @Column(name = "DESCRIPCION", length = 250, nullable = false)
    private String descripcion;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "ETIQUETASGRUPO",
            joinColumns = @JoinColumn(name = "GRUPO_ID"),
            inverseJoinColumns = @JoinColumn(name = "ETIQUETA_ID")
    )
    private List<Etiqueta> etiquetas; //TODO: hacer DTO, controlador y servicio.

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "USUARIOSGRUPO",
            joinColumns = @JoinColumn(name = "GRUPO_ID"),
            inverseJoinColumns = @JoinColumn(name = "USUARIO_ID")
    )
    private List<Usuario> usuarios;
}
