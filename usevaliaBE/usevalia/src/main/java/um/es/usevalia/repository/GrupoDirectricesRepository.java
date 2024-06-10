package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.GrupoDirectrices;

import java.util.List;

public interface GrupoDirectricesRepository extends JpaRepository<GrupoDirectrices, Long> {
    @Query("SELECT gd FROM GrupoDirectrices gd WHERE gd.catalogo.id = :catalogoid")
    List<GrupoDirectrices> findByCatalogo_Id(@Param("catalogoid") Long catalogoId);
}
