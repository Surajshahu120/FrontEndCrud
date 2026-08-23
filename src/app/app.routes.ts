import { Routes } from '@angular/router';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { EmployeeManagement } from './employee-management/employee-management';
import { Address } from './Feature/AddressFeature/address/address';
import { authGuard } from './Core/Guard/auth-guard';
import { authRole } from './Core/Roles/auth-role';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:Login
  },
  {
    path:"employee",
    component:EmployeeManagement,
    canActivate:[authGuard, authRole],
    data: {
      roles: "Admin"
    }
  }
  ,
  {
    path:'signup',
    component:SignUp
  },
  {
    path:'address/:id',
    component:Address,
    canActivate:[authGuard, authRole],
    data: {
      roles: "Employee"
    }
  }
];
