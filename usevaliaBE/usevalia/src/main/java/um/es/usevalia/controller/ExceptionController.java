package um.es.usevalia.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import um.es.usevalia.exception.UsuarioDuplicatedException;
import um.es.usevalia.exception.UsuarioNotFoundException;

@ControllerAdvice
public class ExceptionController {


    @ExceptionHandler(UsuarioNotFoundException.class)
    public ResponseEntity<String> handleUsuarioNotFoundException(UsuarioNotFoundException exception) {
        return ResponseEntity
                .status(404)
                .body(exception.getMessage());
    }

    @ExceptionHandler(UsuarioDuplicatedException.class)
    public ResponseEntity<String> handleUsuarioDuplicatedException(UsuarioDuplicatedException exception) {
        return ResponseEntity
                .status(409)
                .body(exception.getMessage());
    }
}
