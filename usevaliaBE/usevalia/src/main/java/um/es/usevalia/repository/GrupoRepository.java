package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Grupo;

import java.util.List;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {
    @Query("SELECT g FROM Grupo g JOIN g.usuarios u WHERE u.id = :iduser")
    List<Grupo> findByUsuarios_Id(@Param("iduser") Long idUser);
}
