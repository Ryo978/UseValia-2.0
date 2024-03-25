package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.exception.UsuarioDuplicatedException;
import um.es.usevalia.exception.UsuarioNotFoundException;
import um.es.usevalia.mapper.UsuarioMapper;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.UsuarioDTO;
import um.es.usevalia.repository.UsuarioRepository;

import java.util.Date;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    UsuarioMapper mapper = UsuarioMapper.INSTANCE;

    public UsuarioDTO login(String email, String password) throws UsuarioNotFoundException {
        Usuario usuario = repository.findByEmail(email);
        if (usuario == null || !usuario.getPassword().equals(password)) {
            throw new UsuarioNotFoundException("The email or password are incorrect");
        }
        return mapper.usuarioToUsuarioDTO(usuario);
    }

    public UsuarioDTO register(String email, String password, String nombre) throws UsuarioDuplicatedException {
        Usuario usuario = new Usuario(nombre, password, email);
        if (repository.findByEmail(email) != null) {
            throw new UsuarioDuplicatedException("The email is already in use");
        }
        repository.save(usuario);
        return mapper.usuarioToUsuarioDTO(usuario);
    }

    public Usuario getUsuario(Long id) {
        return repository.findById(id).orElse(null);
    }
}
