import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageServiceService } from './token-storage-service.service';

import { User } from '../Models/user/user';


const BASE_URL = 'http://localhost:8084/';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageServiceService) {}

              register(signRequest: any): Observable<any> {
  return this.http.post(BASE_URL + 'api/v1/auth/register', signRequest);
}

login(loginRequest: any): Observable<any> {
  return this.http.post(BASE_URL + 'api/v1/auth/authenticate', loginRequest);
}

logout(): Observable<any> {
  this.tokenStorageService.removeToken();
  return this.http.post(BASE_URL + 'api/v1/auth/logout', null);
}


getCurrentUser(): User | null {
  return this.tokenStorageService.getUser(); 
}


}
