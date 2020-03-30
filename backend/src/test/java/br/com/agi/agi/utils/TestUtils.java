package br.com.agi.agi.utils;

import br.com.agi.agi.models.Usuario;

public class TestUtils {

    public static Usuario createAndReturnBaseUser() {
        Usuario testUser = new Usuario();
        testUser.setEmail("test@test.com");
        testUser.setNome("Teste Teste");
        testUser.setSenha("$2a$12$3i7.yFMycDzYA8ICzZJTweK2H1vqRiY1vSPKWmU0gpyvbgoDZX9ky"); //123456

        return testUser;
    }

}
