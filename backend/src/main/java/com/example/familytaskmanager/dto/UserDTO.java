package com.example.familytaskmanager.dto;

public class UserDTO {
    private String accessToken;
    private Long id;
    private Long familyId;
    private String username;
    private String role;
    private int points;

    public UserDTO(String accessToken, int points, String role, String username, Long familyId, Long id) {
        this.accessToken = accessToken;
        this.points = points;
        this.role = role;
        this.username = username;
        this.familyId = familyId;
        this.id = id;
    }

    public UserDTO() {
    }

    public UserDTO(String accessToken, Long id, String username, String role, int points) {
        this.accessToken = accessToken;
        this.id = id;
        this.username = username;
        this.role = role;
        this.points = points;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public Long getId() {
        return id;
    }

    public Long getFamilyId() {
        return familyId;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public int getPoints() {
        return points;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFamilyId(Long familyId) {
        this.familyId = familyId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
