package com.example.familytaskmanager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="families")
public class Family {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy="family")
    @JsonManagedReference
    private Set<User> members = new HashSet<>();

    public Family(){}

    public Family(String name){
        this.name=name;
    }

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getName(){return name;}
    public void setName(String n){this.name=n;}

    public Set<User> getMembers(){return members;}
    public void setMembers(Set<User> m){this.members=m;}
}
