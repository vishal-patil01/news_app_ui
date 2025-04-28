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

  getStories(query?: string): Observable<any> {
    const url = query ? `${this.baseUrl}/stories?searchTerm=${query}` : `${this.baseUrl}/stories`;
    return this.http.get(url);
  }
}
