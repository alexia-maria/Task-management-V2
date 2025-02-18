import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    return this.http.get<any[]>(this.apiUrl, {headers: headers});
  }

  getLeaderboard(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
  });
    return this.http.get<any[]>(`${this.apiUrl}/leaderboard`, {headers: headers});
  }
}
