package um.es.usevalia.exception;

public class UsuarioDuplicatedException extends Exception{

    private final String message;
    public UsuarioDuplicatedException(String message) {
        this.message = message;
    }
}
