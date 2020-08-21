 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/auth/v1/';
  }

  authenticateUser(data: any) {
    return this.httpClient.post(this.url, data);
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {

    return this.httpClient.post<any>('http://localhost:3000/auth/v1/isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(map(reponse => reponse['isAuthenticated'])).toPromise<any>();
  }
}