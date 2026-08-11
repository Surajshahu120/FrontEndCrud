export interface EmployeeResponseModel{
  message:string,
  employeeData:employeeData
}
export interface AddressData{
        addressId : number;
        buildingNo : string;
        apartment : string;
        street : string;
        employeeId : number;
}
export interface employeeData{
   id:number,
    name: string,
    age: number,
    city: string,
    gender: string,
    birthday: string,
    isMarried: boolean
    addresses: AddressData[]
}
export interface GetEmployeeById{
    message:"string",
    employee:employeeData
}
export interface GetAllEmployeeResponseModel{
  message:string,
  employees:employeeData[]
}
export interface DeleteAllEmployeeResponseModel{
  message:string,
  isDeleted:boolean
}
