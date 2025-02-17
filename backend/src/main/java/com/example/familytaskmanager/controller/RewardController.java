package com.example.familytaskmanager.controller;

import com.example.familytaskmanager.model.Reward;
import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.RewardRepository;
import com.example.familytaskmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardRepository rewardRepo;
    private final UserRepository userRepo;

    public RewardController(RewardRepository rewardRepo, UserRepository userRepo){
        this.rewardRepo=rewardRepo;
        this.userRepo=userRepo;
    }

    // GET /api/rewards
    @GetMapping
    public List<Reward> getAll(){
        return rewardRepo.findAll();
    }

    // POST /api/rewards
    // { "description":"X", "cost":5 }
    @PostMapping
    public Reward createReward(@RequestBody RewardDto dto){
        Reward r=new Reward();
        r.setDescription(dto.getDescription());
        r.setCost(dto.getCost());
        return rewardRepo.save(r);
    }

    // PUT /api/rewards/{rewardId}/claim?userId=2
    @PutMapping("/{rewardId}/claim")
    public String claimReward(@PathVariable Long rewardId,
                              @RequestParam Long userId){
        Reward rw=rewardRepo.findById(rewardId).orElseThrow();
        User u=userRepo.findById(userId).orElseThrow();
        if(u.getPoints()>=rw.getCost()){
            u.setPoints(u.getPoints()-rw.getCost());
            userRepo.save(u);
            rw.setUser(u);
            rewardRepo.save(rw);
            return "Reward claimed";
        }
        return "Not enough points";
    }

    static class RewardDto {
        private String description;
        private int cost;
        public String getDescription(){return description;}
        public void setDescription(String d){this.description=d;}
        public int getCost(){return cost;}
        public void setCost(int c){this.cost=c;}
    }
}
