package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Auditoria;

public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
}
