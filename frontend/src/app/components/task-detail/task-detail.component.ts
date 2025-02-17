import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  // Variabila în care voi stoca detaliile task-ului selectat
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  // La inițializare, extrag ID-ul din URL și preiau detaliile task-ului
  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if(taskId) {
      this.taskService.getTaskById(+taskId).subscribe(data => {
        this.task = data;
      });
    }
  }
}
