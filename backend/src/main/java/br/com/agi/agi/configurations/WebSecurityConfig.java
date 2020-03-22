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
                .antMatchers("/api/users").permitAll()
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
     * Filter that generate JWT token when user logged in.
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
     * Config the JWT authentication filter.
     * 
     * @return JWTBasicAuthenticationFilter
     * @throws Exception
     */
    @Bean
    public JWTBasicAuthenticationFilter jwtBasicAuthenticationFilter() throws Exception {
        return new JWTBasicAuthenticationFilter(authenticationManager());
    }

    /**
     * Config the password encoder for user authentication.
     *
     * @return PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordConfig();
    }

    /**
     * Config application to return 401 when user is not authenticated.
     * 
     * @return AuthenticationEntryPoint
     */
    public AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }
}