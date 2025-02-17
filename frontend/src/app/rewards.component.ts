import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector:'app-rewards',
  templateUrl:'./rewards.component.html',
  styleUrls:['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  rewards:any[]=[];
  showRewardForm:boolean=false;

  newReward:any={
    description:'',
    cost:0
  };

  constructor(private http:HttpClient, public authService:AuthService){}

  ngOnInit(){
    this.loadRewards();
  }

  loadRewards(){
    this.http.get<any[]>('http://localhost:8080/api/rewards')
      .subscribe(data=>this.rewards=data);
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
    const url='http://localhost:8080/api/rewards';
    const params={
      description:this.newReward.description,
      cost:this.newReward.cost
    };
    this.http.post(url, null, { params })
      .subscribe(resp=>{
        alert("Recompensă creată!");
        this.showRewardForm=false;
        this.newReward={description:'', cost:0};
        this.loadRewards();
      });
  }

  claim(rewardId:number){
    if(!this.authService.user) return;
    const userId=this.authService.user.id;
    const url=`http://localhost:8080/api/rewards/${rewardId}/claim?userId=${userId}`;
    this.http.put(url,{}).subscribe(resp=>{
      alert(resp);
      this.loadRewards();
    });
  }
}
