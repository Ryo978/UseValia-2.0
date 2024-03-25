package um.es.usevalia.utils;

public class SecurityUtils {
    private SecurityUtils() {
        throw new IllegalStateException("Utility class");
    }
    static ThreadLocal<String> xAuthTokenTL = new ThreadLocal<>();
    public static String getXAuthToken() {
        return xAuthTokenTL.get();
    }
    public static void setXAuthToken(String xAuthToken) {
        xAuthTokenTL.set(xAuthToken);
    }

    public static ThreadLocal<String> getXAuthTokenTL() {
        return xAuthTokenTL;
    }
}
