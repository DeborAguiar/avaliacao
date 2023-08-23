import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyApiService {
  private apiUrl = 'https://dummyapi.io/data/v1/';
  private headers = { 'app-id': '64cbeddd253549dc8b990b71' };

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}user/create`, userData, { headers: this.headers });
  }

  getUsers(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}user?page=${page}&limit=5`, { headers: this.headers });
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}user/${userId}`, { headers: this.headers });
  }

  updateUser(userId: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}user/${userId}`, updatedUser, { headers: this.headers });
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}user/${userId}`, { headers: this.headers });
  }
}
