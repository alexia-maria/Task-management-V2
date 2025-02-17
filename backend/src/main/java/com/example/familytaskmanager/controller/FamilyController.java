package com.example.familytaskmanager.controller;

import com.example.familytaskmanager.model.Family;
import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.FamilyRepository;
import com.example.familytaskmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/family")
public class FamilyController {

    private final FamilyRepository familyRepo;
    private final UserRepository userRepo;

    public FamilyController(FamilyRepository familyRepo, UserRepository userRepo){
        this.familyRepo=familyRepo;
        this.userRepo=userRepo;
    }

    // GET /api/family -> list familii
    @GetMapping
    public List<Family> allFamilies(){
        return familyRepo.findAll();
    }

    // POST /api/family
    // { "name":"Familia Popescu" }
    @PostMapping
    public Family createFamily(@RequestBody FamilyDto dto){
        Family f=new Family();
        f.setName(dto.getName());
        return familyRepo.save(f);
    }

    // PUT /api/family/{familyId}/addUser?userId=3
    // Asignez user la familia
    @PutMapping("/{familyId}/addUser")
    public String addUserToFamily(@PathVariable Long familyId,
                                  @RequestParam Long userId){
        Family fam=familyRepo.findById(familyId).orElseThrow();
        User u=userRepo.findById(userId).orElseThrow();
        u.setFamily(fam);
        userRepo.save(u);
        return "User "+ u.getUsername()+" assigned to family "+ fam.getName();
    }

    static class FamilyDto {
        private String name;
        public String getName(){return name;}
        public void setName(String n){this.name=n;}
    }
}
