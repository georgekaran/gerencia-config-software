package br.com.agi.agi.controllers;

import java.util.Optional;

import br.com.agi.agi.services.ClientService;
import br.com.agi.agi.utils.ObjectUtils;
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

    @PostMapping
    public ResponseEntity<Item> save(@RequestBody Item item) {
        try {
             if (item.getNome().length() < 3 || item.getValorUnitario() <=0) {
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
 //@GetMapping()
 //   public List<Item> getAllEnable() {
 //       return service.findItemByActive(true);
 //   }

 //       @GetMapping("/disable")
 //   public List<Item> getAllDisable() {
 //       return service.findItemByActive(false);
 //   }

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