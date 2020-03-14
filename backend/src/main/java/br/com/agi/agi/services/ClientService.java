package br.com.agi.agi.services;

import br.com.agi.agi.models.Client;
import br.com.agi.agi.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService extends BaseService<Client, Long, ClientRepository> {

    @Autowired
    public ClientService(ClientRepository clientRepository) { super(clientRepository); }

    public List<Client> findClientByActive(boolean isActive) {
        return getBaseRepository().findClientByActive(isActive);
    }
}
