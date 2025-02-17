import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent {
  username:string='';
  password:string='';

  constructor(
    private http:HttpClient,
    private router:Router,
    private authService:AuthService
  ){}

  doLogin(){
    this.http.post<any>('http://localhost:8080/auth/login',{
      username: this.username,
      password: this.password
    }).subscribe(resp=>{
      this.authService.login(resp);
      this.router.navigate(['/dashboard']);
    }, err=>{
      alert(err.error);
    });
  }
}
