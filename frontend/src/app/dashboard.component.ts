/* FOLDER: frontend/src/app/dashboard.component.ts */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector:'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks:any[]=[];
  leaderboard:any[]=[];
  rewards:any[]=[];
  showAddTask:boolean=false;
  newTask:any={
    title:'',
    description:'',
    difficulty:'Mediu',
    points:10,
    userId:2
  };

  constructor(
    private http:HttpClient,
    public authService:AuthService
  ){}

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

  get isParent(){return this.authService.user?.role==='PARENT';}
  get isChild(){return this.authService.user?.role==='COPIL';}

  claimReward(rid:number){
    if(!this.authService.user) return;
    const url=`http://localhost:8080/api/rewards/${rid}/claim?userId=${this.authService.user.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(url, {}, {headers: headers}).subscribe(resp=>{
      alert(resp);
      this.loadRewards();
    });
  }

  openAddTaskForm(){
    this.showAddTask=true;
  }
  cancelAddTask(){
    this.showAddTask=false;
  }
  submitAddTask(){
    const params={
      title:this.newTask.title,
      description:this.newTask.description,
      difficulty:this.newTask.difficulty,
      points:this.newTask.points,
      userId:this.newTask.userId
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.post<any>('http://localhost:8080/api/tasks', null, { params, headers: headers })
      .subscribe(()=>{
        alert("Task creat");
        this.loadTasks();
        this.showAddTask=false;
        this.newTask={
          title:'',
          description:'',
          difficulty:'Mediu',
          points:10,
          userId:2
        };
      });
  }
}
