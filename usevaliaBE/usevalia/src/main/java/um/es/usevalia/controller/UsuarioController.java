package um.es.usevalia.controller;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.exception.UsuarioNotFoundException;
import um.es.usevalia.model.dto.UsuarioDTO;
import um.es.usevalia.service.UsuarioService;
import um.es.usevalia.utils.JwtTokenUtil;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @SneakyThrows
    @RequestMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@RequestParam String email, @RequestParam String password) {
        UsuarioDTO usuario = usuarioService.login(email, password);
        HttpHeaders headers = getToken(email);
        return new ResponseEntity<>(usuario, headers, HttpStatus.OK);
    }

    @SneakyThrows
    @RequestMapping("/register")
    public ResponseEntity<UsuarioDTO> register(@RequestParam String email, @RequestParam String password, @RequestParam String nombre) {
        UsuarioDTO usuario = usuarioService.register(email, password, nombre);
        HttpHeaders headers = getToken(email);
        return new ResponseEntity<>(usuario, headers, HttpStatus.OK);
    }

    private HttpHeaders getToken(String email) {
        String token = JwtTokenUtil.generateToken(email);
        HttpHeaders headers = new HttpHeaders();
        headers.add("xAuthToken", "Bearer " + token);
        return headers;
    }

}
