import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Jwt } from '../Services/jwt';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var token = inject(Jwt).GetToken();
  console.log(token);
  if(token){
    req = req.clone({
      setHeaders : {
        Authorization : `bearer ${token}`
      }
    })
  }
  return next(req);
};
