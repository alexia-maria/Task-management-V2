import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector:'app-family-admin',
  templateUrl:'./family-admin.component.html',
  styleUrls:['./family-admin.component.scss']
})
export class FamilyAdminComponent implements OnInit {
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
    // GET /api/family
    const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("userToken")}`
          });
    this.http.get<any[]>('http://localhost:8080/api/family', {headers: headers})
      .subscribe(resp=>this.families=resp);
  }

  createFamily(){
    // POST /api/family => { name: newFamilyName }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.post('http://localhost:8080/api/family',{
      name:this.newFamilyName, headers: headers
    }).subscribe((resp:any)=>{
      alert("Familie creată: "+resp.name);
      this.newFamilyName='';
      this.loadFamilies();
    });
  }

  loadUsers(){
    // GET /api/users
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    this.http.get<any[]>('http://localhost:8080/api/users', {headers: headers})
      .subscribe(resp=>this.allUsers=resp);
  }

  addUserToFamily(){
    // PUT /api/family/{familyId}/addUser?userId=xx
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    const url=`http://localhost:8080/api/family/${this.selectedFamilyId}/addUser?userId=${this.selectedUserId}`;
    this.http.put(url,{headers: headers}).subscribe(resp=>{
      alert(resp);
      this.loadFamilies();
    });
  }
}
