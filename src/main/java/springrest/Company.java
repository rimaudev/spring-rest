package springrest;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * Entity class that represents a company.
 *
 */
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @NotBlank
    private String name;
    @NotBlank
    private String address;
    @NotBlank
    private String city;
    @NotBlank
    private String country;
    @Email
    private String email;
    private String phoneNumber;

    @Size(min = 1)
    @ElementCollection
    private Set<String> owners;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
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

    public Set<String> getOwners() {
        return owners;
    }

    public void setOwners(Set<String> owners) {
        this.owners = owners;
    }
}
