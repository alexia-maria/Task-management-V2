/* FOLDER: frontend/src/app/badges/badges.component.ts */
import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../services/badge.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  badges:any[]=[];
  newBadge:any={ name:'', criteria:'' };
  userIdForAssignment:number=2;

  constructor(
    private badgeService:BadgeService,
    public authService:AuthService
  ){}

  ngOnInit(){
    this.loadBadges();
  }

  loadBadges(){
    this.badgeService.getAll().subscribe(b=>this.badges=b);
  }

  createBadge(){
    this.badgeService.createBadge(this.newBadge.name, this.newBadge.criteria)
      .subscribe(()=>{
        this.loadBadges();
        this.newBadge={name:'',criteria:''};
      });
  }

  assignBadge(badgeId:number){
    this.badgeService.assignBadge(badgeId, this.userIdForAssignment)
      .subscribe(()=>{
        alert("Badge assigned");
      });
  }
}
