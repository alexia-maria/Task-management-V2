package com.example.familytaskmanager.controller;

import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {
    private final UserRepository userRepository;

    public LeaderboardController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> top10() {
        return userRepository.findTop10ByOrderByPointsDesc();
    }
}
