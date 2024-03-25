package um.es.usevalia.exception;


public class UsuarioNotFoundException extends Exception {

    private final String message;
    public UsuarioNotFoundException(String message) {
        this.message = message;
    }

}
