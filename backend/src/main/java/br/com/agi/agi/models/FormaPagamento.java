package br.com.agi.agi.models;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;

@Entity
@Table(name = "forma_de_pagamento")
public class FormaPagamento extends Model {
    
    private String descricao;

    private char status = 'A';

    public FormaPagamento(){}

    public FormaPagamento(FormaPagamento formaPagamento) {
        this.id = formaPagamento.getId();
        this.descricao = formaPagamento.getDescricao();
        this.status = formaPagamento.getStatus();
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }


    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

}