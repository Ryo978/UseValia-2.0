package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Etiqueta;

import java.util.List;

public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long> {

    @Query("SELECT e FROM Grupo g JOIN g.etiquetas e WHERE g.id = :grupoid")
    List<Etiqueta> findByGrupoID(@Param("grupoid") Long grupoid);

    Etiqueta findByValor(@Param("nombre") String nombre);
}
