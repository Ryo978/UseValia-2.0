package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Imagen;

public interface ImagenRepository extends JpaRepository<Imagen, Long> {
    @Query("SELECT i FROM Puntuacion p JOIN p.imagen i WHERE p.id = :idPuntuacion")
    Imagen findByPuntuacionId(@Param("idPuntuacion") Long idPuntuacion);
}
