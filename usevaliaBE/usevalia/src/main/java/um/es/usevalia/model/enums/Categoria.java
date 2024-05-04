package um.es.usevalia.model.enums;

public enum Categoria {

    BUSCADORES("Buscadores/Portales"),
    BLOGS("Blogs/informativas"),
    FOROS("Foros/Interacción"),
    REDES_SOCIALES("Redes sociales"),
    TRANSACIONALES("Transacionales"),
    COMERCIO_ELECTRONICO("Comercio electrónico"),
    CORREO_ELECTRONICO("Correo electrónico"),
    ENTRETENIMIENTO("Entretenimiento"),
    ACADEMICO("Académico"),
    COLABORATIVAS("Colaborativas"),
    DESCARGAS("Descargas"),
    CORPORATIVA("Corporativa/Entidades públicas"),
    SERVICIOS("Servicios");


    private final String codigo;

    Categoria(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

    public static Categoria fromString(String text) {
        for (Categoria b : Categoria.values()) {
            if (b.codigo.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }

}
