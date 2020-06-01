package br.com.agi.agi.repositories;

import br.com.agi.agi.models.Item;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query(value = "select c from Item c where c.status = ?1")
    List<Item> findItemByActive(char active);

    @Query("FROM Item u " +
            "WHERE LOWER(u.nome) like %:searchTerm% and u.status <> 'I'")
    Page<Item> findAllPageable(@Param("searchTerm") String searchTerm, Pageable pageable);
}