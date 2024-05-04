package um.es.usevalia.model.enums;

public enum Evaluacion {
    BASIC("Basic"),
    STANDART("Standart"),
    TASKS("Tasks");
    private final String codigo;

    Evaluacion(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

}
