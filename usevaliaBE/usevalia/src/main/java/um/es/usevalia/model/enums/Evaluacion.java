package um.es.usevalia.model.enums;

public enum Evaluacion {
    BASIC("Basic"),
    STANDARD("Standard"),
    TASKS("Tasks");
    private final String codigo;

    Evaluacion(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

    public static Evaluacion fromString(String text) {
        for (Evaluacion b : Evaluacion.values()) {
            if (b.codigo.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }

}
