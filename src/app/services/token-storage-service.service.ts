import { Injectable } from '@angular/core';
import { User } from '../Models/user/user';

const TOKEN_KEY = 
'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFpbWEubW9nYWFkaUBlc3ByaXQudG4iLCJpYXQiOjE3MzAxNTQ0ODgsImV4cCI6MTczMDI0MDg4OH0.cRDBcIQAaAD8ZufzDJYBsORw_jNMGlVvQnXRK7_6WSs';
const USER_KEY = '9a4f2c8d3b7a1e6f45c8a0b3f267d8b1d4e6f3c8a9d2b5f8e3a9c8b5f6v8a3d9';
@Injectable({
  providedIn: 'root'
})

export class TokenStorageServiceService {
  
  constructor() { }
  
  public saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
  public saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  public removeUser(): void {
    localStorage.removeItem(USER_KEY);
  }
}

