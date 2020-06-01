package br.com.agi.agi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.agi.agi.models.Item;
import br.com.agi.agi.repositories.ItemRepository;
import java.util.List;

@Service
public class ItemService extends BaseService<Item, Long, ItemRepository> {

    @Autowired
    public ItemService(ItemRepository ItemRepository) {
        super(ItemRepository);
    }

    public Page<Item> findAllPageable(
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

    public List<Item> findItemByActive(boolean isActive) {
        char isAct = 'A';
        if (!isActive)
            isAct = 'E';
        return getBaseRepository().findItemByActive(isAct);
    }

}