import { Injectable, Service } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class Jwt {
        private readonly tokenKey: string = 'token';
        SetToken(token:string){
          localStorage.setItem(this.tokenKey,token);
        }
        GetToken(){
          return localStorage.getItem(this.tokenKey);
        }
        RemoveToken(){
          localStorage.removeItem(this.tokenKey);
        }
        IsLoggedIn(){
          return this.GetToken() != null;
        }
}
