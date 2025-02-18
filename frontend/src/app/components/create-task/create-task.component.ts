import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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
  allUsers: User[] = []; // poate ar trebui filtrat astfel incat sa se poata asigna doar la user-ul curent si la membrii familiei de care apartine

  constructor(private taskService:TaskService, private router:Router, private userService: UserService){}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(allUsers => {
      this.allUsers = allUsers
    });
  }

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
