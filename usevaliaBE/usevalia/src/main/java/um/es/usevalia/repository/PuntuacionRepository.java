package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.Puntuacion;

import java.util.List;

public interface PuntuacionRepository extends JpaRepository<Puntuacion, Long> {

    @Query("SELECT p FROM Puntuacion p WHERE p.auditoria.id = ?1")
    List<Puntuacion> findByAuditoriaId(Long auditoriaId);

    @Query("UPDATE Puntuacion p SET p.imagen = ?2 WHERE p.id = ?1")
    void addImage(Long id, Imagen imagen);

    @Query("SELECT COUNT(p) FROM Puntuacion p WHERE p.auditoria.id = ?1")
    Long getTotalNumberOfPuntuacionesByAuditoriaId(Long auditoriaId);

    @Query("SELECT DISTINCT p.usuario.nombre FROM Puntuacion p WHERE p.auditoria.id = ?1")
    List<String> getNamesUserByAudit(Long auditId);

}
