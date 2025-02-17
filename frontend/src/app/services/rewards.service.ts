import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RewardsService {
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080/api/rewards');
  }

  createReward(description:string, cost:number){
    const params={ description, cost };
    return this.http.post('http://localhost:8080/api/rewards', null, { params });
  }

  claimReward(rewardId:number, userId:number){
    return this.http.put(`http://localhost:8080/api/rewards/${rewardId}/claim?userId=${userId}`,{});
  }
}
