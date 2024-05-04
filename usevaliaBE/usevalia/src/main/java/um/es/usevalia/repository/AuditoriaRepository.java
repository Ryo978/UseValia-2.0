package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Auditoria;

import java.util.Collection;

public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
    @Query("SELECT a FROM Auditoria a JOIN a.usuarios u WHERE u.id = ?1")
    Collection<Auditoria> findByUsuario_Id(Long userId);
}
