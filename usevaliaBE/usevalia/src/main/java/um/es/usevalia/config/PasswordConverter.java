package um.es.usevalia.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.SneakyThrows;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import um.es.usevalia.utils.AESUtils;

@Converter
public class PasswordConverter implements AttributeConverter<String, String> {

    @SneakyThrows
    @Override
    public String convertToDatabaseColumn(String attribute) {
        return AESUtils.encrypt(attribute); // Cifrar la contraseña antes de guardarla en la base de datos
    }

    @SneakyThrows
    @Override
    public String convertToEntityAttribute(String dbData) {
        return AESUtils.decrypt(dbData); // No es necesario decifrar la contraseña al recuperarla de la base de datos
    }
}