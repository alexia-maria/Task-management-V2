import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BadgeService {
  constructor(private http:HttpClient){}

  getAll():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080/api/badges');
  }

  createBadge(name:string, criteria:string){
    const params={ name, criteria };
    return this.http.post('http://localhost:8080/api/badges', null, { params });
  }

  assignBadge(badgeId:number, userId:number=2){
    return this.http.put(`http://localhost:8080/api/badges/${badgeId}/assign?userId=${userId}`,{});
  }
}
