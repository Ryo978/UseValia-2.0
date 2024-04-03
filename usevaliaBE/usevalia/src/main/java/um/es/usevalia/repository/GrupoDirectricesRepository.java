package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.GrupoDirectrices;

import java.util.List;

public interface GrupoDirectricesRepository extends JpaRepository<GrupoDirectrices, Long> {
    @Query("SELECT gd FROM Catalogo c JOIN c.grupo gd WHERE c.id = ?1")
    List<GrupoDirectrices> findByCatalogo_Id(Long catalogoId);
}
