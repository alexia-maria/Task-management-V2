import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector:'app-tasks',
  templateUrl:'./tasks.component.html',
  styleUrls:['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks:any[]=[];

  constructor(private taskService:TaskService, public authService:AuthService){}

  ngOnInit(){
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getAll().subscribe(resp=>this.tasks=resp);
  }

  startTask(id:number){
    this.taskService.startTask(id).subscribe(()=>this.loadTasks());
  }
  completeTask(id:number){
    this.taskService.completeTask(id).subscribe(()=>this.loadTasks());
  }
}
