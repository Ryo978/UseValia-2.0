package um.es.usevalia.model.enums;

public enum Categoria {
    
    BUSCADORES("Search Engines/Portals"),
    BLOGS("Blogs/Informative"),
    FOROS("Forums/Interaction"),
    REDES_SOCIALES("Social Networks"),
    TRANSACIONALES("Transactional"),
    COMERCIO_ELECTRONICO("E-commerce"),
    CORREO_ELECTRONICO("Email"),
    ENTRETENIMIENTO("Entertainment"),
    ACADEMICO("Academic"),
    COLABORATIVAS("Collaborative"),
    DESCARGAS("Downloads"),
    CORPORATIVA("Corporate/Public Entities"),
    SERVICIOS("Services");


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
