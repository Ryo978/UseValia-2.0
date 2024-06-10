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
@Table(name="imagen")
public class Imagen {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] datosImagen;

    public void setDatosImagen(byte[] datosImagen) {
        this.datosImagen = datosImagen;
    }
}
