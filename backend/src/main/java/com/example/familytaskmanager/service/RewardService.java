package com.example.familytaskmanager.service;

import com.example.familytaskmanager.model.Reward;
import com.example.familytaskmanager.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Reward saveReward(Reward reward) {
        return rewardRepository.save(reward);
    }
}
