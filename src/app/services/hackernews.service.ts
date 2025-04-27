import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class HackernewsService {
  private baseUrl = 'http://localhost:5254/api/news'; 

  constructor(private http: HttpClient) {}

  getTopStories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stories`);
  }

  searchStories(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stories?searchTerm=${query}`);
  }
}
