import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['username','role','points'];
  users: any[] = [];

  ngOnInit(): void {
    this.users = [
      { username: 'Ion', role: 'PARENT', points: 100 },
      { username: 'Ana', role: 'CHILD', points: 50 }
    ];
  }
}
