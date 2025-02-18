import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { EACCES } from 'constants';

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
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    this.http.get<any[]>('http://localhost:8080/api/tasks', {headers: headers})
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/start`,{headers: headers})
      .subscribe(()=>this.load());
  }

  completeTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/complete`,{headers: headers})
      .subscribe(()=>this.load());
  }

  approveTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/approve`,{headers: headers})
      .subscribe(()=>this.load());
  }

  rejectTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/reject`,{headers: headers})
      .subscribe(()=>this.load());
  }
}
