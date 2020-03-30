package br.com.agi.agi.utils;

import br.com.agi.agi.models.Usuario;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
public class JWTUtilsTest {

    @Test
    public void whenGivenValidUser_thenReturnValidMap() {
        Usuario george = new Usuario();
        george.setEmail("george@test.com");
        george.setNome("George Teste");
        george.setSenha("123456");

        Map<String, Object> jwtConfig = JWTUtils.generateJWT(george, "TEST_SECRET");

        // Assert that user exists
        assert(!jwtConfig.isEmpty());
        assertNotNull(jwtConfig.get("token"));
        assertNotNull(jwtConfig.get("type"));
        assertNotNull(jwtConfig.get("expires_at"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void whenGivenInvalidUser_thenThrowError() {
        Usuario george = new Usuario();
        george.setEmail(null);
        george.setNome("George Teste");
        george.setSenha("123456");

        JWTUtils.generateJWT(george, "TEST_SECRET");
    }

}
