package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Directriz;

import java.util.Collection;
import java.util.List;

public interface DirectrizRepository extends JpaRepository<Directriz, Long> {
    @Query("SELECT d FROM Directriz d WHERE d.grupo.id = :grupoid")
    List<Directriz> listByGrupo(@Param("grupoid") Long grupoid);

    @Query("SELECT COUNT(d) FROM Directriz d WHERE d.grupo.catalogo.id = :catalogId and d.peso < 3")
    Long getTotalBasicByCatalog(@Param("catalogId") Long catalogId);

    @Query("SELECT COUNT(d) FROM Directriz d WHERE d.grupo.catalogo.id = :catalogId")
    Long getTotalByCatalog(@Param("catalogId") Long catalogId);
}
