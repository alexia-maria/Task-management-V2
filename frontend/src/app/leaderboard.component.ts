import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector:'app-leaderboard',
  templateUrl:'./leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  leaderboard:any[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.http.get<any[]>('http://localhost:8080/api/leaderboard')
      .subscribe(data=>this.leaderboard=data);
  }
}
