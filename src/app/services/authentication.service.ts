import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public users;

  constructor(private httpClient: HttpClient) {
  }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:3000/auth/v1/',{username:data.username,password:data.password})
  }

  setBearerToken(token) {
    this,localStorage.setItem('token', token);
  }

  getBearerToken() {
    return localStorage.getItem('token');
  }

  isUserAuthenticated(token): boolean{
    
    if (token) {
      return true;
    }
    else {
      return false
    }

  }
}