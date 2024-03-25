package um.es.usevalia.model.enums;

public enum Permiso {
    PUBLICO("Público"),
    GRUPO("Grupo"),
    PRIVADO("Privado");
    private final String codigo;

    Permiso(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

}
