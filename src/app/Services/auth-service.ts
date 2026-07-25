import { HttpClient } from '@angular/common/http';
import { Service, Injectable } from '@angular/core';
import { LoginModel } from '../Interfaces/LoginModel';
import { Observable } from 'rxjs';
import { LoginResponseModel } from '../Interfaces/LoginResponseModel';
import { environment } from '../Environments/environment';

@Injectable(
  {
    providedIn:"root"
  }
)
export class AuthService {
   constructor(private http : HttpClient){
   }
   login(Data:LoginModel):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${environment.apiurl}/User/LogIn`,Data);
   }
}
