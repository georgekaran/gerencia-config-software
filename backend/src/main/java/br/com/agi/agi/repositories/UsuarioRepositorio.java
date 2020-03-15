package br.com.agi.agi.repositories;

import br.com.agi.agi.models.Usuario;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

   @Query("FROM Usuario u " +
           "WHERE LOWER(u.email) like ?1")
   Optional<Usuario> findByEmail(String email);

   @Query("FROM Usuario u " +
           "WHERE LOWER(u.email) like %:searchTerm%")
   Page<Usuario> search(@Param("searchTerm") String searchTerm, Pageable pageable);

}