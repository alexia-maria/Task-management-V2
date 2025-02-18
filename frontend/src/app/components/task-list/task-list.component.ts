import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector:'app-task-list',
  templateUrl:'./task-list.component.html'
})
export class TaskListComponent implements OnInit{
  tasks:any[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.load();
  }

  load(){
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    this.http.get<any[]>('http://localhost:8080/api/tasks', {headers: headers}).subscribe(resp=>this.tasks=resp);
  }

  startTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/start`,{headers: headers}).subscribe(_=>{
      this.load();
    });
  }

  completeTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/complete`,{headers: headers}).subscribe(_=>{
      this.load();
    });
  }

  approveTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/approve`,{headers: headers}).subscribe(_=>{
      this.load();
    });
  }

  rejectTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/tasks/${id}/reject`,{headers: headers}).subscribe(_=>{
      this.load();
    });
  }
}
