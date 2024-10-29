import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = 'http://localhost:8084'; 



  constructor(private http: HttpClient) { }

  

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/v1/user/current`);
  }
  
  

}
