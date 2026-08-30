import { utils } from './../../../../node_modules/cfb/types/index.d';
import { WorkBook } from './../../../../node_modules/xlsx/types/index.d';
import { signal, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeRequestModel } from '../Interfaces/EmployeeRequestModel';
import { Employee } from '../Services/employee';
import { EmployeeResponseModel, GetAllEmployeeResponseModel, DeleteAllEmployeeResponseModel, GetEmployeeById, employeeData } from '../Interfaces/EmployeeResponseModel';
import { RouterLink } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.css',
})
export class EmployeeManagement implements OnInit {
  constructor(private EmployeeInfo: Employee, private ngZone: NgZone) { }
  EmployeeData= signal<EmployeeRequestModel | undefined>(undefined);
  EmployeeList = signal<employeeData[]>([]);
  SelectedEmployee=signal<employeeData[]>([]);
  AddEmployeeDetails(res: EmployeeRequestModel) {
    if (!this.EmployeeData()) {
      this.EmployeeInfo.AddEmployee(res).subscribe((data: EmployeeResponseModel) => {
        console.log(data)
        alert("Data Added Successfully");
        this.EmployeeData.set(undefined); // Reset form to Add mode
        this.GetAllEmployeesData();
      })
    }
    else {
      let request = { ...res, id: this.EmployeeData()?.id }; // Include the ID for update
      this.EmployeeInfo.UpdateEmployee(request).subscribe((data: EmployeeResponseModel) => {
        alert("Data Updated Successfully")
        this.EmployeeData?.set(undefined); // Reset form to Add mode
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
      this.EmployeeData?.set(undefined);
      this.GetAllEmployeesData();
    })
  }
  GetEmployeeDataById(id: number) {
    return this.EmployeeInfo.GetEmployeeById(id).subscribe((data: GetEmployeeById) => {
      console.log("GetEmployeeDataById Response:", data);
      this.EmployeeData.set(data.employee);
    })
  }
toggleEmployee(employee:employeeData,event:Event){
    let check = event.target as HTMLInputElement;
    if(check.checked){
      this.SelectedEmployee.update(employees => [...employees,employee]);
    }
    else{
      this.SelectedEmployee.update(employees => employees.filter(x => x.id != employee.id));
    }
}
isEmployeeSelected(employee:employeeData):boolean{
        return this.SelectedEmployee().some(x => x.id == employee.id);
}
DownloadExcelFile(){
  var excelData=this.SelectedEmployee.length>0?this.SelectedEmployee():this.EmployeeList();
  this.exportToExcel("employee",excelData);
}
exportToExcel(fileName:string,employee:employeeData[]){
      var excelData=employee.map(x => ({
        "id":x.id,
        "name":x.name,
        "age":x.age,
        "birthday":x.birthday,
        "city":x.city,
        "gender":x.gender,
        "isMarried":x.isMarried?true:false
      }))
      var excel=XLSX.utils.json_to_sheet(excelData);
      var workbook=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook,excel,fileName);
      XLSX.writeFile(workbook,`${fileName}.xlsx`);
      alert(`${fileName}.xlsx downloaded successfully`)
}
  ViewData(id: number) { }
  ngOnInit(): void {
    console.log("Ng on init is called");
    console.log('Inside Angular Zone:', NgZone.isInAngularZone());
    this.GetAllEmployeesData();
  }
}
