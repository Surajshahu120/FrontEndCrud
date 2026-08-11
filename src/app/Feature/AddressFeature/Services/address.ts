import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { AddressRepresentationModel, AddOrUpdateAddress, AddAddressRequestModel, UpdateAddressRequestModel, AddAddressResponseModel, GetAllAddressResponseModel, GetAddressByIdResponseModel, UpdateAddressResponseModel } from '../Models/AddressModel';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient){
  }
  AddAddress(address: AddOrUpdateAddress): Observable<AddAddressResponseModel> {
        const request : AddAddressRequestModel = {
            address: address
        };
        return  this.http.post<AddAddressResponseModel>(environment.apiurl + '/Address', request);
  }
  GetAllAddress(): Observable<GetAllAddressResponseModel[]> {
    return this.http.get<GetAllAddressResponseModel[]>(environment.apiurl + '/Address');
  }
  GetAddressById(id: number): Observable<GetAddressByIdResponseModel> {
    return this.http.get<GetAddressByIdResponseModel>(environment.apiurl + '/Address/' + id);
  }
  UpdateAddress(address: AddOrUpdateAddress): Observable<UpdateAddressResponseModel> {
             const request : UpdateAddressRequestModel = {
                address: address
             };
             return this.http.put<UpdateAddressResponseModel>(environment.apiurl + '/Address', request);
  }
}

