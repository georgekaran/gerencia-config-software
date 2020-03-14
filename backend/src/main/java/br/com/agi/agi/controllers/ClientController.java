package br.com.agi.agi.controllers;

import br.com.agi.agi.exceptions.NotFoundException;
import br.com.agi.agi.models.Client;
import br.com.agi.agi.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService service;

    @GetMapping()
    public List<Client> getAllEnable() {
        return service.findClientByActive(true);
    }

    @GetMapping("/disable")
    public List<Client> getAllDisable() {
        return service.findClientByActive(false);
    }

    @GetMapping("/{id}")
    public Client getAll(@PathVariable("id") Long id) {
        Optional<Client> client = service.findOne(id);
        if (!client.isPresent()) {
            throw new NotFoundException();
        }
        return client.get();
    }

    @PostMapping
    public Client save(@RequestBody Client clientBody) {
        try {
            clientBody.setActive(true);
            return service.save(clientBody);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/{id}")
    public Client edit(@PathVariable("id") Long id, @RequestBody Client clientBody) {
        Optional<Client> client = service.findOne(id);
        if (!client.isPresent()) {
            throw new NotFoundException();
        }
        clientBody.setId(id);
        return service.save(clientBody);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable("id") Long id) {
        Optional<Client> clientOptional = service.findOne(id);
        if (!clientOptional.isPresent()) {
            throw new NotFoundException();
        }
        Client client = clientOptional.get();
        client.setActive(false);
        service.save(client);
    }
}
