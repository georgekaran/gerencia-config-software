package br.com.agi.agi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.agi.agi.models.FormaPagamento;
import br.com.agi.agi.repositories.FormaPagamentoRepository;
import java.util.List;

@Service
public class FormaPagamentoService extends BaseService<FormaPagamento, Long, FormaPagamentoRepository> {

    @Autowired
    public FormaPagamentoService(FormaPagamentoRepository FormaPagamentoRepository) {
        super(FormaPagamentoRepository);
    }

    public Page<FormaPagamento> findAllPageable(
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

    public List<FormaPagamento> findItemByActive(boolean isActive) {
        char isAct = 'A';
        if (!isActive)
            isAct = 'E';
        return getBaseRepository().findItemByActive(isAct);
    }

}