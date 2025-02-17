import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector:'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks:any[]=[];
  leaderboard:any[]=[];
  rewards:any[]=[];

  constructor(private http:HttpClient, public authService:AuthService){}

  ngOnInit(){
    this.loadTasks();
    this.loadLeaderboard();
    this.loadRewards();
  }

  loadTasks(){
    this.http.get<any[]>('http://localhost:8080/api/tasks')
      .subscribe(data=>this.tasks=data);
  }

  loadLeaderboard(){
    this.http.get<any[]>('http://localhost:8080/api/leaderboard')
      .subscribe(data=>this.leaderboard=data);
  }

  loadRewards(){
    this.http.get<any[]>('http://localhost:8080/api/rewards')
      .subscribe(data=>this.rewards=data);
  }
}
