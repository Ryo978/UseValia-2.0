package um.es.usevalia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.es.usevalia.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
