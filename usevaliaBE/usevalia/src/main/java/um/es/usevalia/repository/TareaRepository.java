package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.enums.Categoria;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    @Query("SELECT t FROM Tarea t WHERE t.categoria = ?1")
    List<Tarea> findByCategoriaId(String categoriaId);

    @Query("SELECT COUNT(t) FROM Tarea t WHERE t.categoria = ?1")
    long getTotalByCategoria(Categoria categoria);
}
