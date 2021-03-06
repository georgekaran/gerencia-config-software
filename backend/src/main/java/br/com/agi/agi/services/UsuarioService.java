package br.com.agi.agi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.agi.agi.models.Usuario;
import br.com.agi.agi.repositories.UsuarioRepository;

@Service
public class UsuarioService extends BaseService<Usuario, Long, UsuarioRepository> {

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        super(usuarioRepository);
    }

    public Page<Usuario> findAllPageable(
            final String searchTerm,
            final int page,
            final int size) {
        final PageRequest pageRequest = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Order.asc("id")));

        return getBaseRepository().findAllPageable(
                searchTerm.toLowerCase(),
                pageRequest);
    }

    public Page<Usuario> findAll(final int page, final int size) {
        final PageRequest pageRequest = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Order.asc("id")));
                
        return new PageImpl<>(
                getBaseRepository().findAll(),
                pageRequest, size);
    }

    public Optional<Usuario> findById(final Long id) {
        return getBaseRepository().findById(id);
    }

    public Optional<Usuario> findByEmail(final String email) {
        return getBaseRepository().findByEmail(email);
    }

}