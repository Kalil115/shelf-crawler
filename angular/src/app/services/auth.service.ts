import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = 'http://localhost:8080/auth/';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.httpClient.post(this.AUTH_API + 'login', 
    {
      username,
      password
    }, 
    this.httpOptions);
  }

  register(username: string, password: string, email: string): Observable<any>{
    return this.httpClient.post(this.AUTH_API + 'signup',
     {
      username,
      password,
      email
    }, 
    this.httpOptions);
  }
}
