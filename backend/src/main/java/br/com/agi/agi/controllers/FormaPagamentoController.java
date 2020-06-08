package br.com.agi.agi.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.agi.agi.models.FormaPagamento;
import br.com.agi.agi.services.FormaPagamentoService;
import br.com.agi.agi.exceptions.NotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/formapagamento")
public class FormaPagamentoController {

    @Autowired
    private FormaPagamentoService service;

    @GetMapping("/")
    public Page<FormaPagamento> findAllPageable(@RequestParam(value = "search", required = false, defaultValue = "") String searchTerm,
                                         @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return service.findAllPageable(searchTerm, page, size);
    }

    @PostMapping
    public ResponseEntity<FormaPagamento> save(@RequestBody FormaPagamento formaPagamento) {
        try {
             if (formaPagamento.getDescricao().length() < 3) {
                   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
             }
             //if(item.getValorUnitario() >0){
               //  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
             // }
            formaPagamento.setStatus('A');
            FormaPagamento formaCreated = service.save(formaPagamento);
            return ResponseEntity.status(HttpStatus.CREATED).body(formaCreated);
         
           
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/enable")
    public List<FormaPagamento> getAllEnable() {
        return service.findItemByActive(true);
    }

    @GetMapping("/disable")
    public List<FormaPagamento> getAllDisable() {
        return service.findItemByActive(false);
    }

    @GetMapping("/{id}")
    public FormaPagamento getById(@PathVariable("id") Long id) {
        Optional<FormaPagamento> formaPagamento = service.findOne(id);

        if (!formaPagamento.isPresent()) {
            throw new NotFoundException();
        }

        return formaPagamento.get();
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormaPagamento> edit(@PathVariable("id") Long id, @RequestBody FormaPagamento formaPagamento) {
        try {
            Optional<FormaPagamento> formaOptional = service.findOne(id);

            if (!formaOptional.isPresent()) {
                throw new NotFoundException();
            }
            FormaPagamento formaCurrent = formaOptional.get();

            formaCurrent.setDescricao(formaPagamento.getDescricao());
            formaCurrent.setStatus('A');
            

            FormaPagamento formaCreated = service.save(formaCurrent);

            return ResponseEntity.status(HttpStatus.CREATED).body(formaCreated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FormaPagamento> delete(@PathVariable("id") Long id) {
        try {
            Optional<FormaPagamento> formaPagamento = service.findOne(id);
            if (!formaPagamento.isPresent()) {
                throw new NotFoundException();
            }
            FormaPagamento formaCurrent = formaPagamento.get();
            formaCurrent.setStatus('I');

            service.save(formaCurrent);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}