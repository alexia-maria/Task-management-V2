import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private baseUrl = 'http://localhost:8080/api/leaderboard';

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<any[]> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      });
    return this.http.get<any[]>(this.baseUrl, {headers: headers});
  }
}
