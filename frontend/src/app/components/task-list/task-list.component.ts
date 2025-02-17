import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<any[]>('http://localhost:8080/api/tasks').subscribe(resp=>this.tasks=resp);
  }

  startTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/start`,{}).subscribe(_=>{
      this.load();
    });
  }
  completeTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/complete`,{}).subscribe(_=>{
      this.load();
    });
  }
  approveTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/approve`,{}).subscribe(_=>{
      this.load();
    });
  }
  rejectTask(id:number){
    this.http.put(`http://localhost:8080/api/tasks/${id}/reject`,{}).subscribe(_=>{
      this.load();
    });
  }
}
