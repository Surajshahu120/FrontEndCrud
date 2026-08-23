import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { Jwt } from "../../Services/jwt"
export const authGuard : CanActivateFn = ()=>{
  let jwtService = inject(Jwt);
  const router = inject(Router);
  const token = jwtService.GetToken();
  if(!token){
    return router.createUrlTree(['/login']);
  }
  const payload= token !=null ? JSON.parse(atob(token?.split('.')[1])) : undefined;
  const currentDate = Math.floor(Date.now() / 1000);
  if(payload && payload.exp > currentDate){
    return true;
  }
  jwtService.RemoveToken();

  return router.createUrlTree(['/login']);
}
