import { CanActivateFn, Router } from "@angular/router";
import { Jwt } from "../../Services/jwt"
import { inject } from "@angular/core/primitives/di";
export const authRole : CanActivateFn = (route, state) => {
      const jwtService = inject(Jwt);
      const router = inject(Router);
      const token = jwtService.GetToken();
      if (!token) {
        return router.createUrlTree(['/login']);
      }
      const roleData = route.data['roles'];
      const payLoad = token != null ? JSON.parse(atob(token.split('.')[1])) : undefined;
      if(payLoad && payLoad.roles == roleData){
        return true;
      }
      alert("You don't have permission to access this page. Please contact the administrator for access.");
      return false;

};
