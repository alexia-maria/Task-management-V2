import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthService {
  private currentUser:any=null;

  constructor(){
    const saved=localStorage.getItem('loggedUser');
    if(saved){
      this.currentUser=JSON.parse(saved);
    }
  }

  login(u:any){
    this.currentUser=u;
    localStorage.setItem('loggedUser', JSON.stringify(u));
  }

  logout(){
    this.currentUser=null;
    localStorage.removeItem('loggedUser');
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
