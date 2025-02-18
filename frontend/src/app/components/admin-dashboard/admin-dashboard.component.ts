import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    this.http.get<any[]>('http://localhost:8080/api/family', {headers: headers})
      .subscribe(resp=>this.families=resp);
  }

  createFamily(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    // POST /api/family => { "name": this.newFamilyName }
    this.http.post<any>('http://localhost:8080/api/family',{
      name:this.newFamilyName
    }, {headers: headers}).subscribe(resp=>{
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.get<any[]>('http://localhost:8080/api/users', {headers: headers}) 
      .subscribe(resp=>this.allUsers=resp);
  }

  addUserToFamily(){
    // PUT /api/family/{familyId}/addUser?userId=...
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.put(`http://localhost:8080/api/family/${this.selectedFamilyId}/addUser?userId=${this.selectedUserId}`,{}, {headers: headers})
      .subscribe(resp=>{
        alert(resp);
        this.loadFamilies();
      });
  }
}
