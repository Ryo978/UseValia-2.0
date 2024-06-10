package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.Puntuacion;

import java.util.List;

public interface PuntuacionRepository extends JpaRepository<Puntuacion, Long> {

    @Query("SELECT p FROM Puntuacion p WHERE p.auditoria.id = :auditoriaId")
    List<Puntuacion> findByAuditoriaId(@Param("auditoriaId") Long auditoriaId);

    @Query("UPDATE Puntuacion p SET p.imagen = :imagen WHERE p.id = :id")
    void addImage(@Param("id") Long id, @Param("imagen") Imagen imagen);

    @Query("SELECT COUNT(p) FROM Puntuacion p WHERE p.auditoria.id = :auditoriaid")
    Long getTotalNumberOfPuntuacionesByAuditoriaId(@Param("auditoriaid") Long auditoriaId);

    @Query("SELECT DISTINCT p.usuario.nombre FROM Puntuacion p WHERE p.auditoria.id = :auditid")
    List<String> getNamesUserByAudit(@Param("auditid") Long auditId);

    @Query("SELECT p FROM Puntuacion p WHERE p.usuario.id = :userid AND p.auditoria.id = :auditId")
    List<Puntuacion> findByUserId(@Param("userid") Long userId, @Param("auditId")Long auditId);

    @Query("SELECT p FROM Puntuacion p WHERE p.usuario.id = :userId AND p.tarea.id = :taskId AND p.auditoria.id = :auditId")
    List<Puntuacion> findByUserIdAndTaskId(@Param("userId") Long userId, @Param("taskId") Long taskId, @Param("auditId") Long auditId);
}
