package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.enums.Categoria;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    @Query("SELECT t FROM Tarea t WHERE t.categoria = :categoriaID")
    List<Tarea> findByCategoriaId(@Param("categoriaID") Categoria categoriaId);

    @Query("SELECT COUNT(t) FROM Tarea t WHERE t.categoria = :categoria")
    long getTotalByCategoria(@Param("categoria") Categoria categoria);
}
