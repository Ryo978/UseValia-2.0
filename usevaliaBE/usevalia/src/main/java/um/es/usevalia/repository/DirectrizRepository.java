package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Directriz;

import java.util.Collection;
import java.util.List;

public interface DirectrizRepository extends JpaRepository<Directriz, Long> {
    @Query("SELECT d FROM Directriz d WHERE d.grupo.id = ?1")
    List<Directriz> listByGrupo(Long grupoid);

    @Query("SELECT COUNT(d) FROM Directriz d WHERE d.grupo.catalogo.id = ?1 and d.peso < 3")
    Long getTotalBasicByCatalog(Long catalogId);

    @Query("SELECT COUNT(d) FROM Directriz d WHERE d.grupo.catalogo.id = ?1")
    Long getTotalByCatalog(Long catalogId);
}
