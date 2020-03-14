package br.com.agi.agi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "client")
public class Client extends Model {

    @Column(name = "company_name", nullable = true)
    private String companyName;

    @Column(name = "trading_name")
    private String tradingName;

    private String cnpj;

    private String country;
    
    private String district;
    
    private String city;
    
    private String address;

    private boolean active;

    public Client() {

    }

    public Client(String companyName, String tradingName, String cnpj, String district, String city, String address) {
        this.companyName = companyName;
        this.tradingName = tradingName;
        this.cnpj = cnpj;
        this.district = district;
        this.city = city;
        this.address = address;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTradingName() {
        return tradingName;
    }

    public void setTradingName(String tradingName) {
        this.tradingName = tradingName;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}
