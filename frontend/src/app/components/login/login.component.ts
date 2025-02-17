import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent {
  username:string='';
  password:string='';

  constructor(private http:HttpClient, private router:Router, private authService:AuthService){}

  doLogin(){
    // La login, serverul returnează JSON (user) sau text la eroare
    // Lăsăm responseType default (JSON)
    this.http.post<any>('http://localhost:8080/auth/login',{
      username:this.username,
      password:this.password
    }).subscribe({
      next:(resp:any)=>{
        // la succes => resp e user JSON
        this.authService.login(resp);
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>{
        console.error('Login error:', err);
        // ex. "User not found" la 400
        alert('Error: ' + err.status + ' ' + err.statusText);
      }
    });
  }
}
