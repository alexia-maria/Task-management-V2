import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    this.http.get<any[]>('http://localhost:8080/api/tasks', {headers: headers})
      .subscribe(data=>this.tasks=data);
  }

  loadLeaderboard(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.get<any[]>('http://localhost:8080/api/leaderboard', {headers: headers})
      .subscribe(data=>this.leaderboard=data);
  }

  loadRewards(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.get<any[]>('http://localhost:8080/api/rewards', {headers: headers})
      .subscribe(data=>this.rewards=data);
  }
}
