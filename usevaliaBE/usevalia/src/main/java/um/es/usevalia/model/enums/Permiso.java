package um.es.usevalia.model.enums;

public enum Permiso {
    PUBLICO("Public"),
    GRUPO("Group"),
    PRIVADO("Private");
    private final String codigo;

    Permiso(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

    public static Permiso fromString(String text) {
        for (Permiso b : Permiso.values()) {
            if (b.codigo.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }

}
