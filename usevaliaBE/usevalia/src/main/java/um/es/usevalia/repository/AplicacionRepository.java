package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Aplicacion;

public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {
    @Query("SELECT a.id FROM Aplicacion a INNER JOIN Auditoria au WHERE au.id = a.id AND a.id = ?1")
    Long isEditable(Long aplicacionId);
}
