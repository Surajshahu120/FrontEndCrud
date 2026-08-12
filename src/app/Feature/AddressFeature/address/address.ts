import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../Services/address';
import {Employee} from '../../../Services/employee';
import { EmployeeResponseModel, GetEmployeeById } from '../../../Interfaces/EmployeeResponseModel';
import { ActivatedRoute } from '@angular/router';
import { AddressRepresentationModel } from '../Models/AddressModel';
@Component({
  standalone: true,
  selector: 'app-address',
  imports: [ ReactiveFormsModule],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address {
  addressForm: FormGroup;
  constructor(private fb: FormBuilder,private addressModel: AddressService,private empoyeeService: Employee,private route: ActivatedRoute) {
    this.addressForm = this.fb.group({
      buildingNo: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }
    employeeId : number=0;
    addressData : AddressRepresentationModel[] | undefined;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = Number(params.get('id'));
    });
    console.log("employeeId",this.employeeId);
  }
    SubmitForm(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    console.log("address get called",this.addressForm.value);
    this.addressModel.AddAddress(this.addressForm.value).subscribe((data)=>{
      console.log(data);
      alert("Address Added Successfully");
      this.GetAllEmployee();
    })
  }
  GetAllEmployee(){
    this.empoyeeService.GetEmployeeById(this.employeeId).subscribe((data:GetEmployeeById)=>{
    this.addressData=data.employee.addresses;
    })
  }

}
