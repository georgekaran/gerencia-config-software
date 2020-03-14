package br.com.agi.agi.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import br.com.agi.agi.services.CustomUserDetailsService;
import br.com.agi.agi.utils.HashUtils;

import javax.sql.DataSource;

/**
 * 
 * Configuração global de segurança da aplicação
 * 
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    protected DataSource dataSource;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
                .disable()
            .exceptionHandling()
                .authenticationEntryPoint(restAuthenticationEntryPoint())
                .and()
            .authorizeRequests()
                .antMatchers("/api/validateToken").permitAll()
                .anyRequest().authenticated()
            .and()
                .formLogin()
                .permitAll()
            .and()
                .addFilter(jwtUsernamePasswordAuthenticationFilter())
                .addFilter(jwtBasicAuthenticationFilter())
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .logout()
                .permitAll();
    }

    /**
     * Filtro para gerar o token JWT quando o usuário se autentica
     * 
     * @return
     * @throws Exception
     */
    @Bean
    public JWTUsernamePasswordAuthenticationFilter jwtUsernamePasswordAuthenticationFilter() throws Exception {
        JWTUsernamePasswordAuthenticationFilter jwtUsernamePasswordAuthenticationFilter = new JWTUsernamePasswordAuthenticationFilter();
        jwtUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager());
        return jwtUsernamePasswordAuthenticationFilter;
    }


    /**
     * Configura o filtro de autenticação JWT
     * Esse  
     * 
     * @return
     * @throws Exception
     */
    @Bean
    public JWTBasicAuthenticationFilter jwtBasicAuthenticationFilter() throws Exception {
        return new JWTBasicAuthenticationFilter(authenticationManager());
    }

    /**
     * Configura a aplicação para ela retornar erro 401 quando usuário não está autenticado
     * 
     * @return
     */
    public AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(getPasswordEncoder());
    }

    private PasswordEncoder getPasswordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence charSequence) {
                return HashUtils.hashPassword(charSequence.toString());
            }

            @Override
            public boolean matches(CharSequence charSequence, String s) {
                try {
                    return HashUtils.checkPassword(charSequence.toString(), s);
                } catch (Exception e) {
                    return false;
                }
            }
        };
    }

}