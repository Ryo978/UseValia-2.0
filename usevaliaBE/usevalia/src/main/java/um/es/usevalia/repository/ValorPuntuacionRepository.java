package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.ValorPuntuacion;

import java.util.Collection;
import java.util.List;

public interface ValorPuntuacionRepository extends JpaRepository<ValorPuntuacion, Long> {
    @Query("SELECT v FROM ValorPuntuacion v WHERE v.escala.id = ?1")
    List<ValorPuntuacion> findByEscalaId(int idEscala);
}
