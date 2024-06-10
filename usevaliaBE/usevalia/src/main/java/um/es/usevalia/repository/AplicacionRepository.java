package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Aplicacion;

public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {
    @Query("SELECT a.id FROM Aplicacion a INNER JOIN Auditoria au ON au.aplicacion.id = a.id WHERE a.id = :aplicacionId")
    Long isEditable(@Param("aplicacionId") Long aplicacionId);
}
