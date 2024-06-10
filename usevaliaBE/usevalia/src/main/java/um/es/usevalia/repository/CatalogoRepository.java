package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.es.usevalia.model.Catalogo;

import java.util.List;

public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {

}
