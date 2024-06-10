package um.es.usevalia.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import um.es.usevalia.exception.UsuarioDuplicatedException;
import um.es.usevalia.exception.UsuarioNotFoundException;

import java.io.FileNotFoundException;

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

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<String> handleFileNotFoundException(FileNotFoundException exception) {
        return ResponseEntity
                .status(404)
                .body("Ha ocurrido un error inesperado al crear el documento PDF.");
    }
}
