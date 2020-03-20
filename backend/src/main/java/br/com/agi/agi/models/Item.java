package br.com.agi.agi.models;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;

@Entity
@Table(name = "item")
public class Item extends Model {
    
    private String nome;

    @Column(name = "vlr_unitario")
    private double valorUnitario;

    private char status = 'A';

    public Item(){}

    public Item(Item item) {
        this.id = item.getId();
        this.nome = item.getNome();
        this.valorUnitario = item.getValorUnitario();
        this.status = item.getStatus();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(double valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

}