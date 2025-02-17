import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<any[]>('http://localhost:8080/api/family')
      .subscribe(resp=>this.families=resp);
  }

  createFamily(){
    // POST /api/family => { name: newFamilyName }
    this.http.post('http://localhost:8080/api/family',{
      name:this.newFamilyName
    }).subscribe((resp:any)=>{
      alert("Familie creată: "+resp.name);
      this.newFamilyName='';
      this.loadFamilies();
    });
  }

  loadUsers(){
    // GET /api/users
    this.http.get<any[]>('http://localhost:8080/api/users')
      .subscribe(resp=>this.allUsers=resp);
  }

  addUserToFamily(){
    // PUT /api/family/{familyId}/addUser?userId=xx
    const url=`http://localhost:8080/api/family/${this.selectedFamilyId}/addUser?userId=${this.selectedUserId}`;
    this.http.put(url,{}).subscribe(resp=>{
      alert(resp);
      this.loadFamilies();
    });
  }
}
