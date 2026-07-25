import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { SignUpRequestModel, SignUpResponseModel } from '../Interfaces/SignupModel';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
    providedIn: 'root'
})
export class User {
  constructor(private http:HttpClient){}
  CreateUser(res:SignUpRequestModel):Observable<SignUpResponseModel>{
         return this.http.post<SignUpResponseModel>(`${environment.apiurl}/User/CreateUser`,res);
  }
}
