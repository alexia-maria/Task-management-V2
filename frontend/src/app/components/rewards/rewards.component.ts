/* rewards.component.ts */
import { Component, OnInit } from '@angular/core';
import { RewardsService } from 'src/app/services/rewards.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector:'app-rewards',
  templateUrl:'./rewards.component.html',
  styleUrls:['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  rewards:any[]=[];
  showRewardForm:boolean=false;
  newReward:any={ description:'', cost:0 };

  constructor(private rewardsService:RewardsService, public authService:AuthService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.rewardsService.getAll().subscribe(data=>this.rewards=data);
  }

  get isParent(){
    return this.authService.user?.role==='PARENT';
  }
  get isChild(){
    return this.authService.user?.role==='COPIL';
  }

  toggleRewardForm(){
    this.showRewardForm=!this.showRewardForm;
  }

  createReward(){
    this.rewardsService.createReward(this.newReward.description, this.newReward.cost)
      .subscribe(()=>{
        alert("Recompensă creată!");
        this.showRewardForm=false;
        this.newReward={description:'', cost:0};
        this.load();
      });
  }

  claim(rewardId:number){
    if(!this.authService.user) return;
    this.rewardsService.claimReward(rewardId, this.authService.user.id)
      .subscribe(resp=>{
        alert(resp);
        this.load();
      });
  }
}