package br.com.agi.agi.configurations;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import br.com.agi.agi.models.Usuario;
import br.com.agi.agi.repositories.UsuarioRepositorio;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 
 * Filtro de autenticação JWT
 * 
 * Esse filtro analisa todas as requisições, e determina se o usuário está autenticado
 * Para que o usuário seja considerado autenticado, é necessário exister o heder "Authorization",
 * contendo o token JWT ("Bearer " + token). 
 * 
 * A assinatura e a validade do token tabmém são validadas
 */
public class JWTBasicAuthenticationFilter extends BasicAuthenticationFilter {

    @Value("${jwt.secret}")
    protected String secret;

    @Autowired
    protected UsuarioRepositorio userRepository;

    public JWTBasicAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        try {

            String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader == null) {
                chain.doFilter(request, response);
                return;
            }

            String headerSplited[] = authorizationHeader.split(" ");

            if (headerSplited.length != 2 || !headerSplited[0].equals("Bearer")) {
                chain.doFilter(request, response);
                return;
            }

            //Decodifica o token JWT
            String jwt = headerSplited[1];
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(secret)).build().verify(jwt);
            
            //Busca o usuario na base de dados
            String email = decodedJWT.getClaim("email").asString();
            Optional<Usuario> user = userRepository.findByEmail(email);

            if (!user.isPresent()) {
                throw new Exception("User " + email + " not found");
            }

            //Monta as permissões do usuario
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            // for (Role role: user.get().getRoles()) {
            //     grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
            // }

            //Cria a autenticação do spring security
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, null, grantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);

        } catch (JWTVerificationException ex) {

            CORSFilter.addHeaders(response);
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            return;

        } catch (Exception e) {

            CORSFilter.addHeaders(response);
            response.sendError(HttpStatus.NOT_FOUND.value());
            return;
            
        }
    }
}
