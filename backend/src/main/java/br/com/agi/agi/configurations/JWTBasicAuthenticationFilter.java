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
import br.com.agi.agi.repositories.UsuarioRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * JWT authentication filter
 * 
 * This filter analyzes every request, and determines whether the user is authenticated.
 * To be considered authenticated, it's required to have the header "Authorization", with the JWT token.
 * e.g: ("Bearer " + token).
 */
public class JWTBasicAuthenticationFilter extends BasicAuthenticationFilter {

    @Value("${jwt.secret}")
    protected String secret;

    @Autowired
    protected UsuarioRepository userRepository;

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

            //Decode JWT token.
            String jwt = headerSplited[1];
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(secret)).build().verify(jwt);
            
            //Search for user in the database.
            String email = decodedJWT.getClaim("email").asString();
            Optional<Usuario> user = userRepository.findByEmail(email);

            if (!user.isPresent()) {
                throw new Exception("User " + email + " not found");
            }

            //Build user's permissions.
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            //Create the authentication of Spring Security.
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, null, grantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        } catch (JWTVerificationException ex) {
            CORSFilter.addHeaders(response);
            response.sendError(HttpStatus.UNAUTHORIZED.value());
        } catch (Exception e) {
            CORSFilter.addHeaders(response);
            response.sendError(HttpStatus.NOT_FOUND.value());
        }
    }
}
