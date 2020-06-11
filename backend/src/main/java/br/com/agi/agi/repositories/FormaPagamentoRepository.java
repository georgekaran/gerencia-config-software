package br.com.agi.agi.repositories;

import br.com.agi.agi.models.FormaPagamento;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Long> {
    @Query(value = "select c from FormaPagamento c where c.status = ?1")
    List<FormaPagamento> findItemByActive(char active);

    @Query("FROM FormaPagamento u " +
            "WHERE LOWER(u.descricao) like %:searchTerm% and u.status <> 'I'")
    Page<FormaPagamento> findAllPageable(@Param("searchTerm") String searchTerm, Pageable pageable);
}