package com.example.familytaskmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role;
    private int points;

    @ManyToOne
    @JoinColumn(name="family_id")
    @JsonBackReference
    private Family family;

    // GETTER / SETTER

    public Long getId() {return id;}
    public void setId(Long id) {this.id=id;}

    public String getUsername() {return username;}
    public void setUsername(String username){this.username=username;}

    public String getPassword(){return password;}
    public void setPassword(String password){this.password=password;}

    public String getRole(){return role;}
    public void setRole(String role){this.role=role;}

    public int getPoints(){return points;}
    public void setPoints(int p){this.points=p;}

    public Family getFamily(){return family;}
    public void setFamily(Family f){this.family=f;}
}
