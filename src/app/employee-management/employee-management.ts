import { signal, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeRequestModel } from '../Interfaces/EmployeeRequestModel';
import { Employee } from '../Services/employee';
import { EmployeeResponseModel, GetAllEmployeeResponseModel, DeleteAllEmployeeResponseModel, GetEmployeeById, employeeData } from '../Interfaces/EmployeeResponseModel';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.css',
})
export class EmployeeManagement implements OnInit {
  constructor(private EmployeeInfo: Employee, private ngZone: NgZone) { }
  EmployeeData?: EmployeeRequestModel | undefined;
  EmployeeList = signal<employeeData[]>([]);
  ;
  AddEmployeeDetails(res: EmployeeRequestModel) {
    if (!this.EmployeeData) {
      this.EmployeeInfo.AddEmployee(res).subscribe((data: EmployeeResponseModel) => {
        console.log(data)
        this.EmployeeData = undefined; // Reset form to Add mode
        alert("Data Added Successfully");
        this.GetAllEmployeesData();
      })
    }
    else {
      let request = { ...res, id: this.EmployeeData.id };
      this.EmployeeInfo.UpdateEmployee(request).subscribe((data: EmployeeResponseModel) => {
        alert("Data Updated Successfully")
        this.EmployeeData = undefined;
         this.GetAllEmployeesData();
      })
    }

  }
  GetAllEmployeesData() {
    console.log("Calling GetAllEmployee API");

    this.EmployeeInfo.GetAllEmployee().subscribe({
      next: (data) => {

        console.log("Response:", data);

        this.EmployeeList.set(data.employees);
        setTimeout(() => {
          console.log("Timeout executed");
        }, 0);
        console.log(
          'Inside Angular Zone:',
          NgZone.isInAngularZone()
        );

        /*So the short answer

Main culprit: Angular 22's zoneless change-detection architecture + using a plain mutable array for asynchronously updated UI state.

OnPush is not the culprit.

zone.js being outside the callback was a separate issue we observed, but adding Zone.js doesn't solve the underlying rendering problem in your Angular 22 architecture.

For this project, I'd now remove the Zone.js changes and use signals rather than continuing to force the old Zone-based model. */

        console.log("EmployeeList:", this.EmployeeList);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }
  DeleteData(id: number) {
    return this.EmployeeInfo.DeleteEmployeeById(id).subscribe((data: DeleteAllEmployeeResponseModel) => {
      alert(data.message);
      this.GetAllEmployeesData();
    })
  }
  GetEmployeeDataById(id: number) {
    return this.EmployeeInfo.GetEmployeeById(id).subscribe((data: GetEmployeeById) => {
      this.EmployeeData = data.employee;
    })
  }
  ViewData(id: number) { }
  ngOnInit(): void {
    console.log("Ng on init is called");
    console.log('Inside Angular Zone:', NgZone.isInAngularZone());
    this.GetAllEmployeesData();
  }
}
