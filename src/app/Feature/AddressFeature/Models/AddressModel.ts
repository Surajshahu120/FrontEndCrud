export interface AddOrUpdateAddress{
          id :number;
        buildingNo : string;
        apartment : string;
        street : string;
        employeeId : number;
}
export interface AddressRepresentationModel{
        buildingNo : string;
        apartment : string;
        street : string;
        employeeId : number;
}
export interface AddAddressRequestModel {
        address: AddOrUpdateAddress;
}
export interface AddAddressResponseModel{
  message:string;
  address: AddressRepresentationModel;
}
export interface UpdateAddressRequestModel {
  address: AddOrUpdateAddress;
}
export interface UpdateAddressResponseModel{
  message:string;
  address: AddressRepresentationModel;
}
export interface DeleteAddressResponseModel{
  message:string;
  isDeleted:boolean;
}
export interface GetAllAddressResponseModel{
  message:string;
  address: AddressRepresentationModel[];
}
export interface GetAddressByIdResponseModel{
  message:string;
  address: AddressRepresentationModel;
}
