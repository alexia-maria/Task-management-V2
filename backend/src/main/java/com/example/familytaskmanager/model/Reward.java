package com.example.familytaskmanager.model;

import javax.persistence.*;

@Entity
@Table(name="rewards")
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private int cost;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public Long getId() { return id; }
    public void setId(Long i) { this.id = i; }

    public String getDescription() { return description; }
    public void setDescription(String d) { this.description = d; }

    public int getCost() { return cost; }
    public void setCost(int c) { this.cost = c; }

    public User getUser() { return user; }
    public void setUser(User u) { this.user = u; }
}
