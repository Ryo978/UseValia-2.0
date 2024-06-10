package um.es.usevalia.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import um.es.usevalia.config.PasswordConverter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "NOMBRE", length = 50, nullable = false)
    private String nombre;

    @Column(name = "PASSWORD", length = 50, nullable = false)
    @Convert(converter = PasswordConverter.class)
    private String password;

    @Column(name = "EMAIL", length = 80, nullable = false, unique = true)
    private String email;

    @Column(name = "ROL", length = 50)
    private String rol;

    @CreatedDate
    private Date created;

    @Column(name = "CHANGED")
    private Date changed;

    @Column(name = "TEMPORARY_ENABLED")
    private boolean temporaryEnabled;

    @Column(name = "TEMPORARY_PASSWORD")
    private String temporaryPassword;


    public Usuario(String nombre, String password, String email) {
        this.nombre = nombre;
        this.password = password;
        this.email = email;
        this.created = new Date();
        this.changed = new Date();
    }
}
