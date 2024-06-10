package um.es.usevalia.service;

import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.exception.UsuarioDuplicatedException;
import um.es.usevalia.exception.UsuarioNotFoundException;
import um.es.usevalia.mapper.UsuarioMapper;
import um.es.usevalia.mapper.UsuarioMapperImpl;
import um.es.usevalia.model.Usuario;
import um.es.usevalia.model.dto.UsuarioDTO;
import um.es.usevalia.repository.UsuarioRepository;
import um.es.usevalia.utils.PasswordCreation;

import java.util.Date;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    @Autowired
    EmailService emailService;

    UsuarioMapper mapper = new UsuarioMapperImpl();


    public List<UsuarioDTO> getUsuarios() {
        return repository.findAll().stream().map(mapper::usuarioToUsuarioDTO).toList();
    }

    public UsuarioDTO login(String email, String password) throws UsuarioNotFoundException {
        Usuario usuario = repository.findByEmail(email);
        if (usuario == null || (!usuario.getPassword().equals(password) && ((usuario.getTemporaryPassword() != null && !usuario.getTemporaryPassword().equals(password)) || !usuario.isTemporaryEnabled()))) {
            throw new UsuarioNotFoundException("The email or password are incorrect");
        }

        if (usuario.getTemporaryPassword() != null && usuario.getTemporaryPassword().equals(password) && usuario.isTemporaryEnabled()) {
            usuario.setTemporaryEnabled(false);
            repository.save(usuario);
        }
        return mapper.usuarioToUsuarioDTO(usuario);
    }

    public UsuarioDTO register(String email, String password, String nombre) throws UsuarioDuplicatedException {
        Usuario usuario = new Usuario(nombre, password, email);
        if (repository.findByEmail(email) != null) {
            throw new UsuarioDuplicatedException("The email is already in use");
        }
        usuario.setRol("user");
        usuario.setChanged(new Date());
        repository.save(usuario);
        return mapper.usuarioToUsuarioDTO(usuario);
    }

    public Usuario getUsuario(Long id) {
        return repository.findById(id).orElse(null);
    }

    public UsuarioDTO getUsuarioDTO(Long id) {
        return mapper.usuarioToUsuarioDTO(getUsuario(id));
    }

    @Named("getUsuariosFromDTO")
    public List<Usuario> getUsuariosFromDTO(List<UsuarioDTO> usuariosDTO) {
        return usuariosDTO.stream().map(usuarioDTO -> getUsuario(usuarioDTO.getId())).toList();
    }

    public UsuarioDTO updateUsuario(Long id, String nombre, String password) throws UsuarioNotFoundException {
        Usuario usuario = repository.findById(id).orElse(null);
        if (usuario == null) {
            throw new UsuarioNotFoundException("The user does not exist");
        }
        usuario.setNombre(nombre);
        usuario.setPassword(password);
        usuario.setChanged(new Date());
        repository.save(usuario);
        return mapper.usuarioToUsuarioDTO(usuario);
    }

    public UsuarioDTO updateRol(Long id, String rol) throws UsuarioNotFoundException {
        Usuario usuario = repository.findById(id).orElse(null);
        if (usuario == null) {
            throw new UsuarioNotFoundException("The user does not exist");
        }
        usuario.setRol(rol);
        usuario.setChanged(new Date());
        repository.save(usuario);
        return mapper.usuarioToUsuarioDTO(usuario);
    }

    public void resetPassword(String email) throws Exception {
        Usuario usuario = repository.findByEmail(email);
        if (usuario == null) {
            throw new UsuarioNotFoundException("The user does not exist");
        }
        usuario.setTemporaryEnabled(true);
        String password = PasswordCreation.generatePassword();
        usuario.setTemporaryPassword(password);
        repository.save(usuario);
        String asunto = "Usevalia's password reset";
        String mensaje = "Hello, here is your temporary password : " + password;
        emailService.enviarCorreo(email, asunto, mensaje);

    }
}
