package um.es.usevalia.model.enums;

public enum Permisos {
    PUBLICO("Público"),
    GRUPO("Grupo"),
    PRIVADO("Privado");
    private final String codigo;

    Permisos(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

}
