import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root' 
})
export class HackernewsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTopStories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stories`);
  }

  searchStories(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stories?searchTerm=${query}`);
  }
}
