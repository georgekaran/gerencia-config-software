package br.com.agi.agi.configurations;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * Componente para requisições não autenticadas.
 * Quando o SpringSecurity não conseguir autenticar o usuário, ele simplesmente
 * retornará erro 401, e não a tela de login que é o comportamente padrão
 */
@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException {

        CORSFilter.addHeaders(response);

        if (request.getMethod().equals("OPTIONS") || request.getMethod().equals("HEAD")) {
            response.sendError(HttpServletResponse.SC_OK, "OK");
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }
}