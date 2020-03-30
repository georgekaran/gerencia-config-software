package br.com.agi.agi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.hamcrest.Matchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = AgiApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class LoginIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void whenCredentialsAreValid_thenShouldLogin() {
        try {
            mvc.perform(post("/login")
                    .queryParam("username", "test@test.com")
                    .queryParam("password", "123456")
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content()
                            .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.token", notNullValue()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void whenCredentialsAreInvalid_thenShouldSendUnauthorized() {
        try {
            mvc.perform(post("/login")
                    .queryParam("username", "nottest@test.com")
                    .queryParam("password", "123456")
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
