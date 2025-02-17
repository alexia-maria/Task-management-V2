package com.example.familytaskmanager.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date deadline;
    private String difficulty;
    private int points;
    private boolean completed;
    private String status;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User assignedTo;

    public Long getId() { return id; }
    public void setId(Long i) { this.id = i; }

    public String getTitle() { return title; }
    public void setTitle(String t) { this.title = t; }

    public String getDescription() { return description; }
    public void setDescription(String d) { this.description = d; }

    public Date getDeadline() { return deadline; }
    public void setDeadline(Date dd) { this.deadline = dd; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String diff) { this.difficulty = diff; }

    public int getPoints() { return points; }
    public void setPoints(int p) { this.points = p; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean c) { this.completed = c; }

    public String getStatus() { return status; }
    public void setStatus(String s) { this.status = s; }

    public User getAssignedTo() { return assignedTo; }
    public void setAssignedTo(User u) { this.assignedTo = u; }
}
