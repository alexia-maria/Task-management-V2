import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RewardsService {
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    return this.http.get<any[]>('http://localhost:8080/api/rewards', {headers: headers});
  }

  createReward(description:string, cost:number){
    const params={ description, cost };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.post('http://localhost:8080/api/rewards', null, { params, headers: headers });
  }

  claimReward(rewardId:number, userId:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.put(`http://localhost:8080/api/rewards/${rewardId}/claim?userId=${userId}`,{headers: headers});
  }
}
