import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080/api/tasks');
  }

  createTask(title:string, description:string, difficulty:string, points:number, userId:number){
    const params={ title, description, difficulty, points, userId };
    return this.http.post<any>('http://localhost:8080/api/tasks', null, { params });
  }

  startTask(id:number){
    return this.http.put(`http://localhost:8080/api/tasks/${id}/start`,{});
  }
  completeTask(id:number){
    return this.http.put(`http://localhost:8080/api/tasks/${id}/complete`,{});
  }
  approveTask(id:number){
    return this.http.put(`http://localhost:8080/api/tasks/${id}/approve`,{});
  }
  rejectTask(id:number){
    return this.http.put(`http://localhost:8080/api/tasks/${id}/reject`,{});
  }
}
