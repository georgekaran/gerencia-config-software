package br.com.agi.agi.controllers;

import java.util.Map;
import java.util.Optional;

import br.com.agi.agi.models.Client;
import br.com.agi.agi.models.PasswordHelper;
import br.com.agi.agi.services.ClientService;
import br.com.agi.agi.utils.HashUtils;
import br.com.agi.agi.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.agi.agi.models.Usuario;
import br.com.agi.agi.services.UsuarioService;
import br.com.agi.agi.exceptions.NotFoundException;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @Autowired
    private ClientService clientService;

    @GetMapping("/search")
    public Page<Usuario> search(@RequestParam("searchTerm") String searchTerm,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return service.search(searchTerm, page, size);
    }

    @GetMapping
    public Page<Usuario> getAll(@RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return service.findAll(page, size);
    }

    @GetMapping("/{email}")
    public Usuario get(@PathVariable("email") String email) {
        Optional<Usuario> user = service.findByEmail(email);

        if (!user.isPresent()) {
            throw new NotFoundException();
        }

        return user.get();
    }

    @GetMapping("/email/{email}")
    public boolean checkIfEmailExists(@PathVariable("email") String email) {
        Optional<Usuario> user = service.findByEmail(email);

        return user.isPresent();
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<Usuario> updatePassword(@PathVariable("id") Long id, @RequestBody PasswordHelper passwordHelper) {
        Optional<Usuario> userOptional = service.findById(id);
        if (!userOptional.isPresent()) {
            throw new NotFoundException();
        }

        if (!ObjectUtils.nullOrEmpty(passwordHelper)) {
            Usuario user = userOptional.get();
            user.setPassword(HashUtils.hashPassword(passwordHelper.password));
            service.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity edit(@PathVariable("id") Long id, @RequestBody Usuario userBody) {
        try {
            Optional<Usuario> user = service.findOne(id);
            Usuario userCurrent = user.get();

            userCurrent.setEmail(userBody.getEmail());
            userCurrent.setNome(userBody.getNome());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(userCurrent));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Usuario user) {
        try {
            user.setPassword(HashUtils.hashPassword(user.getSenha()));
            user.setStatus('A');
            Usuario userCreated = service.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        try {
            Optional<Usuario> user = service.findOne(id);
            if (!user.isPresent()) {
                throw new NotFoundException();
            }
            service.delete(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}