package br.com.agi.agi.repositories;

import br.com.agi.agi.AgiApplication;
import br.com.agi.agi.models.FormaPagamento;
import br.com.agi.agi.controllers.FormaPagamentoController;
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
        locations = {"classpath:application-integrationtest.properties"})
public class FormaPagamentoRepositoryTest  {


    @Autowired
    private MockMvc mvc;


    @Test
    public void validateName() {
        try {
            MvcResult result = mvc.perform(post("/login")
                                    .queryParam("username", "test@test.com")
                                    .queryParam("password", "123456")
                                    .contentType(MediaType.APPLICATION_JSON))
                                    .andReturn();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(result.getResponse().getContentAsString(), Map.class);

            FormaPagamento forma = new FormaPagamento();
            forma.setDescricao("aaaa");
            

            mvc.perform(post("/api/formapagamento")
                    .header("Authorization", "Bearer " + map.get("token"))
                    .content(asJsonString(forma))
                    .contentType(MediaType.APPLICATION_JSON))
                    //.andExpect(status().isBadRequest());
                    .andExpect(status().isCreated());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

     @Test
    public void validateNameFail() {
        try {
            MvcResult result = mvc.perform(post("/login")
                                    .queryParam("username", "test@test.com")
                                    .queryParam("password", "123456")
                                    .contentType(MediaType.APPLICATION_JSON))
                                    .andReturn();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(result.getResponse().getContentAsString(), Map.class);

            FormaPagamento forma = new FormaPagamento();
            forma.setDescricao("aa");
            

            mvc.perform(post("/api/formapagamento")
                    .header("Authorization", "Bearer " + map.get("token"))
                    .content(asJsonString(forma))
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
                    //.andExpect(status().isCreated());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

     @Test
    public void validateNameToLongFail() {
        try {
            MvcResult result = mvc.perform(post("/login")
                                    .queryParam("username", "test@test.com")
                                    .queryParam("password", "123456")
                                    .contentType(MediaType.APPLICATION_JSON))
                                    .andReturn();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(result.getResponse().getContentAsString(), Map.class);

            FormaPagamento forma = new FormaPagamento();
            forma.setDescricao("aaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnooooppppqqqqrrrrssssttttuuuuvvvvvxxxxzzzzaaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnooooppppqqqqrrrrssssttttuuuuvvvvvxxxxzzzzaaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnooooppppqqqqrrrrssssttttuuuuvvvvvxxxxzzzz");
            

            mvc.perform(post("/api/formapagamento")
                    .header("Authorization", "Bearer " + map.get("token"))
                    .content(asJsonString(forma))
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
                    //.andExpect(status().isCreated());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

       @Test
    public void validateDeleteFail() {
        try {
            MvcResult result = mvc.perform(post("/login")
                                    .queryParam("username", "test@test.com")
                                    .queryParam("password", "123456")
                                    .contentType(MediaType.APPLICATION_JSON))
                                    .andReturn();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(result.getResponse().getContentAsString(), Map.class);

            FormaPagamento forma = new FormaPagamento();
            forma.setDescricao("aaaa");
            

            mvc.perform(delete("/api/formapagamento/0")
                    .header("Authorization", "Bearer " + map.get("token"))
                    .content(asJsonString(forma))
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
                    //.andExpect(status().isCreated());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    



}