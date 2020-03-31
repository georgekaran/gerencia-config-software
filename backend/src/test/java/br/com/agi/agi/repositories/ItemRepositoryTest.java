package br.com.agi.agi.repositories;

import br.com.agi.agi.AgiApplication;
import br.com.agi.agi.models.Item;
import br.com.agi.agi.controllers.ItemController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;

import static br.com.agi.agi.utils.ObjectUtils.asJsonString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = AgiApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class ItemRepositoryTest  {


    @Autowired
    private MockMvc mvc;


    @Test
    public void test() {
        try {
            MvcResult result = mvc.perform(post("/login")
                                    .queryParam("username", "test@test.com")
                                    .queryParam("password", "123456")
                                    .contentType(MediaType.APPLICATION_JSON))
                                    .andReturn();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(result.getResponse().getContentAsString(), Map.class);

            Item item = new Item();
            item.setNome("aa");
            item.setValorUnitario(10.00);

            mvc.perform(post("/api/itens")
                    .header("Authorization", "Bearer " + map.get("token"))
                    .content(asJsonString(item))
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}