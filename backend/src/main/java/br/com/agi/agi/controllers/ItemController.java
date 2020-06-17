package br.com.agi.agi.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.agi.agi.models.Item;
import br.com.agi.agi.services.ItemService;
import br.com.agi.agi.exceptions.NotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/itens")
public class ItemController {

    @Autowired
    private ItemService service;

    @GetMapping("/")
    public Page<Item> findAllPageable(@RequestParam(value = "search", required = false, defaultValue = "") String searchTerm,
                                         @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return service.findAllPageable(searchTerm, page, size);
    }

    @PostMapping
    public ResponseEntity<Item> save(@RequestBody Item item) {
        try {
             if (item.getNome().length() < 3 || item.getValorUnitario() <=0 || item.getValorUnitario() >= 9999999) {
                   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
             }

            
             //if(item.getValorUnitario() >0){
               //  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
             // }
            item.setStatus('A');
            Item itemCreated = service.save(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(itemCreated);
         
           
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/enable")
    public List<Item> getAllEnable() {
        return service.findItemByActive(true);
    }

    @GetMapping("/disable")
    public List<Item> getAllDisable() {
        return service.findItemByActive(false);
    }

    @GetMapping("/{id}")
    public Item getById(@PathVariable("id") Long id) {
        Optional<Item> item = service.findOne(id);

        if (!item.isPresent()) {
            throw new NotFoundException();
        }

        return item.get();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> edit(@PathVariable("id") Long id, @RequestBody Item item) {
        try {
            Optional<Item> itemOptional = service.findOne(id);

            if (!itemOptional.isPresent()) {
                throw new NotFoundException();
            }
            Item itemCurrent = itemOptional.get();

            itemCurrent.setNome(item.getNome());
            itemCurrent.setStatus('A');
            itemCurrent.setValorUnitario(item.getValorUnitario());

            Item itemCreated = service.save(itemCurrent);

            return ResponseEntity.status(HttpStatus.CREATED).body(itemCreated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Item> delete(@PathVariable("id") Long id) {
        try {
            if(id < 0){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            Optional<Item> item = service.findOne(id);
            if (!item.isPresent()) {
                throw new NotFoundException();
            }
            Item itemCurrent = item.get();
            itemCurrent.setStatus('I');

            service.save(itemCurrent);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}