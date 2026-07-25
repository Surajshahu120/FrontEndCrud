import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // <-- Add this import
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { LoginModel } from '../Interfaces/LoginModel';
import { LoginResponseModel } from '../Interfaces/LoginResponseModel';
import { Jwt } from '../Services/jwt';

@Component({
  selector: 'app-login',
  imports: [MatIconModule,RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    constructor(private LoginData:AuthService,private jwtData:Jwt, private router: Router){}
    GetData(data : LoginModel){
      console.log(data)
      return this.LoginData.login(data).subscribe({
        next:(response) =>{
             console.log(response.accessToken);
             console.log(response);
             this.jwtData.SetToken(response.accessToken);
             this.router.navigate(["/employee"]);
        },
        error:(error)=>{
          alert(error.error.message);
        }
      });
    }
}
