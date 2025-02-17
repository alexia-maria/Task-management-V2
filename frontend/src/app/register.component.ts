import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username:string='';
  password:string='';
  role:string='COPIL';  // sau 'PARENT' / 'ADMIN'
  points:number=0;      // optional

  constructor(private http:HttpClient, private router:Router){}

  doRegister(){
    // Pentru că serverul returnează text simplu (ex: "Registered"), 
    // punem { responseType: 'text' }.
    this.http.post('http://localhost:8080/auth/register',{
      username:this.username,
      password:this.password,
      role:this.role,
      points:this.points
    }, { responseType: 'text' })
      .subscribe({
        next:(resp:string)=>{
          // resp e text => "Registered" sau "Username already taken"
          alert(resp);
          if(resp==='Registered'){
            this.router.navigate(['/login']);
          }
        },
        error:(err)=>{
          // Poate primi text. Afișăm cu JSON.stringify.
          alert(JSON.stringify(err.error));
        }
      });
  }
}
