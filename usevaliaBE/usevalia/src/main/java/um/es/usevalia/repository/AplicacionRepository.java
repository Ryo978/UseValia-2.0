package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Aplicacion;

public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {
}
