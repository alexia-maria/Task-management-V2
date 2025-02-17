package com.example.familytaskmanager.controller;

import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo){
        this.userRepo=userRepo;
    }

    // GET /api/users -> listăm toți userii
    @GetMapping
    public List<User> allUsers(){
        return userRepo.findAll();
    }
}
