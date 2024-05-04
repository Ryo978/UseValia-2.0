package um.es.usevalia.controller;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.exception.UsuarioNotFoundException;
import um.es.usevalia.model.dto.UsuarioDTO;
import um.es.usevalia.service.UsuarioService;
import um.es.usevalia.utils.JwtTokenUtil;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @SneakyThrows
    @GetMapping
    @RequestMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@RequestParam String email, @RequestParam String password) {
        UsuarioDTO usuario = usuarioService.login(email, password);
        HttpHeaders headers = getToken(email);
        return new ResponseEntity<>(usuario, headers, HttpStatus.OK);
    }

    @SneakyThrows
    @PostMapping
    @RequestMapping("/register")
    public ResponseEntity<UsuarioDTO> register(@RequestParam String email, @RequestParam String password, @RequestParam String nombre) {
        UsuarioDTO usuario = usuarioService.register(email, password, nombre);
        HttpHeaders headers = getToken(email);
        return new ResponseEntity<>(usuario, headers, HttpStatus.OK);
    }
    @GetMapping
    @RequestMapping("/list")
    public ResponseEntity<List<UsuarioDTO>> listUsuarios() {
        return ResponseEntity.ok(usuarioService.getUsuarios());
    }

    @GetMapping
    @RequestMapping("/getCreated")
    public ResponseEntity<Date> getCreated(@RequestParam Long id) {
        return ResponseEntity.ok(usuarioService.getUsuario(id).getCreated());
    }

    @SneakyThrows
    @PutMapping
    @RequestMapping("/update")
    public ResponseEntity<UsuarioDTO> updateUsuario(@RequestParam Long id, @RequestParam String nombre, @RequestParam String password) {
        return ResponseEntity.ok(usuarioService.updateUsuario(id, nombre, password));
    }

    @SneakyThrows
    @PutMapping
    @RequestMapping("/updateRol")
    public ResponseEntity<UsuarioDTO> updateUsuario(@RequestParam Long id, @RequestParam String rol) {
        return ResponseEntity.ok(usuarioService.updateRol(id,rol));
    }

    @SneakyThrows
    @GetMapping
    @RequestMapping("/getNombre")
    public ResponseEntity<String> getNombre(@RequestParam Long id) {
        return ResponseEntity.ok(usuarioService.getUsuario(id).getNombre());
    }

    @SneakyThrows
    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<UsuarioDTO> getUsuario(@RequestParam Long id) {
        return ResponseEntity.ok(usuarioService.getUsuarioDTO(id));
    }



    private HttpHeaders getToken(String email) {
        String token = JwtTokenUtil.generateToken(email);
        HttpHeaders headers = new HttpHeaders();
        headers.add("xAuthToken", "Bearer " + token);
        return headers;
    }

}
