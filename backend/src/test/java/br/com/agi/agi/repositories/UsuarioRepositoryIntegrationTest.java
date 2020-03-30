package br.com.agi.agi.repositories;

import br.com.agi.agi.models.Usuario;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UsuarioRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void whenFindByEmail_thenReturnUser() {
        // given
        Usuario george = new Usuario();
        george.setEmail("george@test.com");
        george.setNome("George Teste");
        george.setSenha("123456");

        entityManager.persist(george);
        entityManager.flush();

        // when
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(george.getEmail());

        // Assert that user exists
        assert(optionalUsuario.isPresent());

        // Assert that user has the same email as george
        Usuario user = optionalUsuario.get();
        assertThat(user.getEmail(), Matchers.is(george.getEmail()));
    }
}
