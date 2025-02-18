import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector:'app-leaderboard',
  templateUrl:'./leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  leaderboard:any[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(){
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    this.http.get<any[]>('http://localhost:8080/api/leaderboard', {headers: headers})
      .subscribe(data=>this.leaderboard=data);
  }
}
