package br.com.agi.agi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.agi.agi.models.CustomUserDetails;
import br.com.agi.agi.models.Usuario;
import br.com.agi.agi.repositories.UsuarioRepositorio;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> optionalUsers = usuarioRepositorio.findByEmail(email);

        optionalUsers
                .orElseThrow(() -> new UsernameNotFoundException("Usuario nao encontrado"));
        return optionalUsers
                .map(CustomUserDetails::new).get();
    }
}
