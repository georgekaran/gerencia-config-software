package br.com.agi.agi.repositories;

import br.com.agi.agi.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query(value = "select c from Client c where c.active = ?1")
    List<Client> findClientByActive(boolean active);
}
