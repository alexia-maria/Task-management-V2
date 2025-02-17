import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector:'app-admin-dashboard',
  templateUrl:'./admin-dashboard.component.html',
  styleUrls:['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  families:any[]=[];
  newFamilyName:string='';

  allUsers:any[]=[];
  selectedFamilyId:number=1;
  selectedUserId:number=0;

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.loadFamilies();
    this.loadUsers();
  }

  loadFamilies(){
    this.http.get<any[]>('http://localhost:8080/api/family')
      .subscribe(resp=>this.families=resp);
  }

  createFamily(){
    // POST /api/family => { "name": this.newFamilyName }
    this.http.post<any>('http://localhost:8080/api/family',{
      name:this.newFamilyName
    }).subscribe(resp=>{
      alert("Familie creată: "+ resp.name);
      this.loadFamilies();
      this.newFamilyName='';
    });
  }

  loadUsers(){
    // GET /api/users (nu avem controler special? 
    // Ai două opțiuni: 
    //   1) creezi un GET /api/users 
    //   2) te bazezi pe /auth/list sau altceva
    // Aici exemplu minimal, să știi să-l implementezi la backend
    this.http.get<any[]>('http://localhost:8080/api/users') 
      .subscribe(resp=>this.allUsers=resp);
  }

  addUserToFamily(){
    // PUT /api/family/{familyId}/addUser?userId=...
    this.http.put(`http://localhost:8080/api/family/${this.selectedFamilyId}/addUser?userId=${this.selectedUserId}`,{})
      .subscribe(resp=>{
        alert(resp);
        this.loadFamilies();
      });
  }
}
