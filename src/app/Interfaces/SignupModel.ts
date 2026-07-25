export interface SignUpRequestModel{
  Username : string,
  UserEmail : string,
  Password : string
}

export interface SignUpResponseModel{
  id : string,
  message : string
}
