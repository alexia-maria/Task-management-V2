import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class AuthService {
  private currentUser:any=null;

  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http:HttpClient){
    const saved=localStorage.getItem('loggedUser');
    if(saved){
      this.currentUser=JSON.parse(saved);
    }
  }

  login(u:any){
    this.currentUser=u;
    localStorage.setItem('loggedUser', JSON.stringify(u));
    localStorage.setItem("userToken", u.accessToken!);
    
  }

  logout(){
    this.currentUser=null;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem("userToken");
    window.location.href='/login';
  }

  get user(){
    return this.currentUser;
  }
  get isLoggedIn(){
    return !!this.currentUser;
  }
  get isAdmin(){
    return this.currentUser?.role==='ADMIN';
  }
  get isParent(){
    return this.currentUser?.role==='PARENT';
  }
  get isChild(){
    return this.currentUser?.role==='COPIL';
  }
}
