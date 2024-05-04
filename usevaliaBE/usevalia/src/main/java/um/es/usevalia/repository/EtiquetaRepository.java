package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Etiqueta;

import java.util.List;

public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long> {

    @Query("SELECT e FROM Grupo g JOIN g.etiquetas e WHERE g.id = ?1")
    List<Etiqueta> findByGrupoID(Long grupoid);

    Etiqueta findByValor(String nombre);
}
