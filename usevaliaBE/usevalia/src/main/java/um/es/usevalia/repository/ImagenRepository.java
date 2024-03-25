package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.Prioridad;

public interface ImagenRepository extends JpaRepository<Imagen, Long> {
}
