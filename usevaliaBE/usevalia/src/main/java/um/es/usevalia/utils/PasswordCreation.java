package um.es.usevalia.utils;

public class PasswordCreation {

    private static final String
            CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

    private static final int tamano = 15;
    public static String generatePassword() {
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < tamano; i++) {
            int index = (int) (CHARACTERS.length() * Math.random());
            password.append(CHARACTERS.charAt(index));
        }
        return password.toString();
    }
}
