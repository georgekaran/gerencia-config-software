package br.com.agi.agi.forms;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class UserProfileForm {

    @NotNull
    private String nome;

    @NotNull
    @Email
    private String email;

    public String getNome() {
        return nome;
    }

    public void setNome(String name) {
        this.nome = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}