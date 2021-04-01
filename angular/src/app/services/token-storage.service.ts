import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private tokenKey = 'auth-token';
  private userKey = 'auth-user';

  constructor() { }

  signout() :void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.tokenKey);
    window.sessionStorage.setItem(this.tokenKey, token);
  }

  public getToken():string | null {
    return window.sessionStorage.getItem(this.tokenKey);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.userKey);
    window.sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.userKey);
    if(user){
      return JSON.parse(user);
    }else{
      return {};
    }
  }
}
