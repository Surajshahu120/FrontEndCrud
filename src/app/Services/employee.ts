import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeResponseModel, GetAllEmployeeResponseModel, DeleteAllEmployeeResponseModel,GetEmployeeById } from '../Interfaces/EmployeeResponseModel';
import { AddEmployeeRequestModel, EmployeeRequestModel,UpdateEmployeeRequestModel } from '../Interfaces/EmployeeRequestModel';
import { environment } from '../Environments/environment';

@Injectable({
  "providedIn":"root"
})
export class Employee {
  constructor(private http:HttpClient){}
  AddEmployee(data:EmployeeRequestModel):Observable<EmployeeResponseModel>{
      const request :AddEmployeeRequestModel={
           employee:data
      };
     return this.http.post<EmployeeResponseModel>(`${environment.apiurl}/Employees`, request);
  }
  GetAllEmployee():Observable<GetAllEmployeeResponseModel>{
            return this.http.get<GetAllEmployeeResponseModel>(`${environment.apiurl}/Employees`);
  }
  GetEmployeeById(id:number):Observable<GetEmployeeById>{
            return this.http.get<GetEmployeeById>(`${environment.apiurl}/Employees/${id}`);
  }
  UpdateEmployee(data:EmployeeRequestModel):Observable<EmployeeResponseModel>{
           var request : UpdateEmployeeRequestModel={
              representationModel:data
           }
            return this.http.put<EmployeeResponseModel>(`${environment.apiurl}/Employees`,request);
  }
  DeleteEmployeeById(id:number):Observable<DeleteAllEmployeeResponseModel>{
    return this.http.delete<DeleteAllEmployeeResponseModel>(`${environment.apiurl}/Employees/${id}`);
  }
}
