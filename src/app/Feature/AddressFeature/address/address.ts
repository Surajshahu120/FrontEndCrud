import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../Services/address';
import {employee} from '../../../Services/employee';
import { EmployeeResponseModel } from '../../../Interfaces/EmployeeResponseModel';
@Component({
  standalone: true,
  selector: 'app-address',
  imports: [ ReactiveFormsModule],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder,private addressModel: AddressService) {
    this.addressForm = this.fb.group({
      buildingNo: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
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
    })
  }

}
