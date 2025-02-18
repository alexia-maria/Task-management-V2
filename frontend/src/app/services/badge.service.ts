import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BadgeService {
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    return this.http.get<any[]>('http://localhost:8080/api/badges', {headers: headers});
  }

  createBadge(name:string, criteria:string){
    const params={ name, criteria };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.post('http://localhost:8080/api/badges', null, { params, headers: headers });
  }

  assignBadge(badgeId:number, userId:number=2){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.put(`http://localhost:8080/api/badges/${badgeId}/assign?userId=${userId}`,{headers: headers});
  }
}
