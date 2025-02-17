import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector:'app-register',
  templateUrl:'./register.component.html',
  styleUrls:['./register.component.scss']
})
export class RegisterComponent {
  username:string='';
  password:string='';
  role:string='COPIL';  // poate fi "ADMIN", "PARENT", "COPIL"
  points:number=0;

  constructor(private http:HttpClient, private router:Router){}

  doRegister(){
    // Folosim { responseType:'text' } pentru că serverul returnează string
    this.http.post('http://localhost:8080/auth/register',{
      username:this.username,
      password:this.password,
      role:this.role,
      points:this.points
    }, { responseType:'text' })
    .subscribe({
      next:(resp:string)=>{
        // la succes => "Registered"
        alert(resp);
        if(resp==='Registered'){
          this.router.navigate(['/login']);
        }
      },
      error:(err)=>{
        console.error('Register error:', err);
        // ex. "Username already taken" la 400
        alert('Error: ' + err.status + ' ' + err.statusText);
      }
    });
  }
}
