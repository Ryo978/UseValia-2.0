package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
}
