import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.get<any[]>('http://localhost:8080/api/tasks', {headers: headers});
  }

  createTask(title:string, description:string, difficulty:string, points:number, userId:number){
    const params={ title, description, difficulty, points, userId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
  let newTask: Task = {
    title: title,
    description: description,
    difficulty: difficulty,
    points: points,
    assignedUserId: userId,
    completed: false
  }
    return this.http.post<any>('http://localhost:8080/api/tasks', newTask, {headers: headers });
  }

  startTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.put(`http://localhost:8080/api/tasks/${id}/start`, {}, {headers: headers});
  }

  completeTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.put(`http://localhost:8080/api/tasks/${id}/complete`, {}, {headers: headers});
  }

  approveTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.put(`http://localhost:8080/api/tasks/${id}/approve`, {}, {headers: headers});
  }

  rejectTask(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.put(`http://localhost:8080/api/tasks/${id}/reject`, {}, {headers: headers});
  }
}
