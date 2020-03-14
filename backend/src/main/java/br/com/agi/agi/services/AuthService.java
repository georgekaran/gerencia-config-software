package br.com.agi.agi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import br.com.agi.agi.models.Usuario;
import br.com.agi.agi.exceptions.UnauthorizedException;

@Service
public class AuthService {

    @Autowired
    protected UsuarioService usuarioService;

    public Usuario getUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Optional<Usuario> user = usuarioService.findByEmail(email);

        if (!user.isPresent()) {
            throw new UnauthorizedException();
        }

        return user.get();

    }

}