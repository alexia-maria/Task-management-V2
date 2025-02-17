package com.example.familytaskmanager.repository;

import com.example.familytaskmanager.model.Family;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyRepository extends JpaRepository<Family, Long> {
    // optional: Family findByName(String name);
}
