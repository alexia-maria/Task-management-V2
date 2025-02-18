package com.example.familytaskmanager.controller;

import com.example.familytaskmanager.dto.UserDTO;
import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.UserRepository;
import com.example.familytaskmanager.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static java.util.Objects.nonNull;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private JwtTokenProvider tokenProvider;

    public AuthController(UserRepository userRepo, PasswordEncoder encoder, JwtTokenProvider tokenProvider) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.tokenProvider = tokenProvider;
    }

    // POST /auth/register
    // Body JSON: { "username": "nume", "password": "1234", "role": "ADMIN|PARENT|COPIL", "points": 0 }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            if (userRepo.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest().body("Username already taken");
            }
            user.setPassword(encoder.encode(user.getPassword()));
            // Setăm puncte implicite dacă nu sunt furnizate
            if (user.getPoints() == 0) {
                user.setPoints(0);
            }
            userRepo.save(user);
            return ResponseEntity.ok("Registered");
        } catch (Exception e) {
            logger.error("Error in register", e);
            return ResponseEntity.status(500).body("Server error during registration");
        }
    }

    // POST /auth/login
    // Body JSON: { "username": "nume", "password": "1234" }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User req) {
        try {
            Optional<User> opt = userRepo.findByUsername(req.getUsername());
            if (!opt.isPresent()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            User dbUser = opt.get();
            // mai bine intoarcem un userDTO care are doar campurile care ne intereseaza la user pt front, inclusiv token-ul de access
            // token-ul de access e pastrat in local storage si va fi inclus in header-ul fiecarui request catre backend
            UserDTO userDTO = new UserDTO(tokenProvider.generateToken(dbUser.getUsername(), dbUser.getRole())
                    , dbUser.getId(), dbUser.getUsername(), dbUser.getRole(), dbUser.getPoints());
            if (nonNull(dbUser.getFamily())) {
                userDTO.setFamilyId(dbUser.getFamily().getId());
            }
            if (!encoder.matches(req.getPassword(), dbUser.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid password");
            }
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            logger.error("Error in login", e);
            return ResponseEntity.status(500).body("Server error during login");
        }
    }
}
