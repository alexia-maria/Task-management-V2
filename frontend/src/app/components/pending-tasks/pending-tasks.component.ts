import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector:'app-pending-tasks',
  templateUrl:'./pending-tasks.component.html',
  styleUrls:['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {
  tasks:any[]=[];

  constructor(private taskService:TaskService, public authService:AuthService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.taskService.getAll().subscribe(resp=>{
      // filtrăm task-urile care sunt 'FINALIZAT' (în așteptare aprobare)
      this.tasks = resp.filter(t=>t.status==='FINALIZAT');
    });
  }

  approveTask(id:number){
    this.taskService.approveTask(id).subscribe(()=>this.load());
  }
  rejectTask(id:number){
    this.taskService.rejectTask(id).subscribe(()=>this.load());
  }
}
