package br.com.agi.agi.configurations;

import br.com.agi.agi.utils.HashUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordConfig implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        return HashUtils.hashPassword(rawPassword.toString());
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        try {
            return HashUtils.checkPassword(rawPassword.toString(), encodedPassword);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
