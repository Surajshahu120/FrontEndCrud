import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeRequestModel } from '../Interfaces/EmployeeRequestModel';
import { Employee } from '../Services/employee';
import { EmployeeResponseModel, GetAllEmployeeResponseModel, DeleteAllEmployeeResponseModel, GetEmployeeById } from '../Interfaces/EmployeeResponseModel';
import { Router, RouterLink } from '@angular/router';
import { NgForOf } from "../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-employee-management',
    standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.css',
})
export class EmployeeManagement {
  constructor(private EmployeeInfo:Employee){}
  EmployeeData? : EmployeeRequestModel | undefined ;
  EmployeeList? : GetAllEmployeeResponseModel | undefined;
  AddEmployeeDetails(res:EmployeeRequestModel){
    if(!this.EmployeeData){
                this.EmployeeInfo.AddEmployee(res).subscribe((data:EmployeeResponseModel)=>{
          console.log(data)
          this.EmployeeData = undefined; // Reset form to Add mode
          alert("Data Added Successfully");
          this.GetAllEmployeesData();
        })
    }
    else{
      let request  = {...res,id:this.EmployeeData.id};
      this.EmployeeInfo.UpdateEmployee(request).subscribe((data:EmployeeResponseModel)=>{
        alert("Data Updated Successfully")
         this.EmployeeData=data.employeeData;
      })
    }

  }
GetAllEmployeesData() {
  console.log("Calling GetAllEmployee API");

  this.EmployeeInfo.GetAllEmployee().subscribe({
    next: (data) => {
      console.log("Response:", data);
      this.EmployeeList = data;
      // this.cdr.detectChanges();
      console.log("EmployeeList:", this.EmployeeList);
    },
    error: (err) => {
      console.error(err);
    }
  });
}
DeleteData(id:number){
  return this.EmployeeInfo.DeleteEmployeeById(id).subscribe((data:DeleteAllEmployeeResponseModel)=>{
     alert(data.message);
    this.GetAllEmployeesData();
  })
}
GetEmployeeDataById(id:number){
  return this.EmployeeInfo.GetEmployeeById(id).subscribe((data:GetEmployeeById)=>{
            this.EmployeeData=data.employee;
  })
}
ViewData(id:number){}
ngOnInit(): void{
  console.log("Ng on init is called");
    this.GetAllEmployeesData();
  }
}
