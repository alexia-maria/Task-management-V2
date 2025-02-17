import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = environment.apiUrl + '/api/leaderboard';

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
