package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Puntuacion;

public interface PuntuacionRepository extends JpaRepository<Puntuacion, Long> {
}
