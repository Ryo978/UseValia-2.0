package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Catalogo;

public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {
}
