export interface EmployeeRequestModel {
  id?: number,
  name: string,
  age: number,
  city: string,
  gender: string,
  birthday: string,
  isMarried: boolean
}
export interface AddEmployeeRequestModel{
  employee:EmployeeRequestModel
}
export interface UpdateEmployeeRequestModel{
    representationModel :  EmployeeRequestModel
}
