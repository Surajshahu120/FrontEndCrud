import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { EmployeeManagement } from './employee-management/employee-management';

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
    component:EmployeeManagement
  }
  ,
  {
    path:'signup',
    component:SignUp
  }
];
