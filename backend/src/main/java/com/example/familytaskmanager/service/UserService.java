package com.example.familytaskmanager.service;

import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = repo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Nu am găsit user: " + username));
        return org.springframework.security.core.userdetails.User
            .withUsername(u.getUsername())
            .password(u.getPassword())
            .roles(u.getRole())
            .build();
    }

    public User save(User u) {
        return repo.save(u);
    }

    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }
}
