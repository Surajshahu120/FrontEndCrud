import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { SignUpResponseModel,SignUpRequestModel } from '../Interfaces/SignupModel';
import { User } from '../Services/user';

@Component({
  selector: 'app-sign-up',
  imports: [MatIconModule,RouterLink,FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(private userData: User, private router: Router){}
  SignUp(Data:SignUpRequestModel){
        this.userData.CreateUser(Data).subscribe((option)=>{
          console.log(option);
          alert(option.message);
          this.router.navigate(["/login"]);
        })
  }
}
