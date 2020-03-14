package br.com.agi.agi.forms;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class UserProfileForm {

    @NotNull
    private String name;

    @NotNull
    @Email
    private String email;

    private String phoneNumber;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}