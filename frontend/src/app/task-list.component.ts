import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector:'app-task-list',
  templateUrl:'./task-list.component.html',
  styleUrls:['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks:any[]=[];

  constructor(
    private http:HttpClient,
    public authService:AuthService
  ){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.http.get<any[]>('http://localhost:8080/api/tasks')
      .subscribe(resp=>{
        if(this.authService.user?.role==='COPIL'){
          const uid=this.authService.user.id;
          this.tasks=resp.filter(t=>t.assignedTo && t.assignedTo.id===uid);
        } else {
          this.tasks=resp;
        }
      });
  }

  startTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/start`,{})
      .subscribe(()=>this.load());
  }
  completeTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/complete`,{})
      .subscribe(()=>this.load());
  }
  approveTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/approve`,{})
      .subscribe(()=>this.load());
  }
  rejectTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/reject`,{})
      .subscribe(()=>this.load());
  }
}
