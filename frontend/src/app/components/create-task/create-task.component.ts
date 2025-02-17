import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector:'app-create-task',
  templateUrl:'./create-task.component.html',
  styleUrls:['./create-task.component.scss']
})
export class CreateTaskComponent {
  title:string='';
  description:string='';
  difficulty:string='Mediu';
  points:number=10;
  userId:number=2; // ID-ul copilului (sau selectez dintre useri, exemplu simplu)

  constructor(private taskService:TaskService, private router:Router){}

  createTask(){
    this.taskService.createTask(
      this.title,
      this.description,
      this.difficulty,
      this.points,
      this.userId
    ).subscribe({
      next:()=>{
        alert("Task creat cu succes!");
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>alert(err.error)
    });
  }
}
