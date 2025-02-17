package com.example.familytaskmanager.service;

import com.example.familytaskmanager.model.Family;
import com.example.familytaskmanager.repository.FamilyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FamilyService {

    @Autowired
    private FamilyRepository familyRepository;

    // Metodă pentru a obține toate familiile din sistem
    public List<Family> getAllFamilies() {
        return familyRepository.findAll();
    }
    
    // Metodă pentru a obține o familie după ID
    public Optional<Family> getFamilyById(Long id) {
        return familyRepository.findById(id);
    }
    
    // Metodă pentru salvarea sau actualizarea unei familii
    public Family saveFamily(Family family) {
        return familyRepository.save(family);
    }
    
    // Metodă pentru ștergerea unei familii
    public void deleteFamily(Long id) {
        familyRepository.deleteById(id);
    }
}
