package com.example.familytaskmanager.repository;

import com.example.familytaskmanager.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}
