package com.example.familytaskmanager.dto;

import com.example.familytaskmanager.model.Family;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class UserDTO {
    private String accessToken;
    private Long id;
    private Long familyId;
    private String username;
    private String role;
    private int points;
}
