package br.com.agi.agi.configurations;

import br.com.agi.agi.models.Usuario;
import br.com.agi.agi.utils.JWTUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

/**
 * 
 * Esse filtro gera um token JWT e retorna para o usuário
 * O usuário deve armazenar este token e enviar pelo header "Authorization"
 * nas requisições subsequentes
 * 
 */
public class JWTUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Value("${jwt.secret}")
    protected String secret;

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        Usuario user = (Usuario) authResult.getPrincipal();
        
        CORSFilter.addHeaders(response);

        HashMap<String, String> output = JWTUtils.generateJWT(user, secret);

        this.returnJson(response, output);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException failed)
			throws IOException, ServletException {
                
		SecurityContextHolder.clearContext();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        CORSFilter.addHeaders(response);

        HashMap<String, String> output = new HashMap<>();
        output.put("error", "Invalid credentials");

        this.returnJson(response, output);
    }

    private void returnJson(HttpServletResponse response, HashMap<String, String> output) throws IOException {
        response.addHeader("Content-Type", "application/json");
        PrintWriter out = response.getWriter();
        String json = new ObjectMapper().writeValueAsString(output);
        out.print(json);
    }

    
}
