import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../Services/address';
import {Employee} from '../../../Services/employee';
import { EmployeeResponseModel, GetEmployeeById } from '../../../Interfaces/EmployeeResponseModel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddressRepresentationModel } from '../Models/AddressModel';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-address',
  imports: [ ReactiveFormsModule,CommonModule,RouterLink ],
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
    addressData = signal<AddressRepresentationModel[]>([]);
    addressDataSingle : AddressRepresentationModel  | undefined;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = Number(params.get('id'));
    });
          this.addressForm.patchValue({
        employeeId : this.employeeId
      })
      this.addressForm.get("employeeId")?.disable();
    console.log("employeeId",this.employeeId);
    this.GetAllEmployee();
  }
    SubmitForm(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    const formData = this.addressForm.getRawValue();
    if(!this.addressDataSingle){
      console.log("Add address get called",this.addressForm.value);

      this.addressModel.AddAddress(formData).subscribe((data)=>{
        console.log(data);
        alert("Address Added Successfully");
        this.GetAllEmployee();
      })
    }
    else{
      let request = {...formData,id:this.addressDataSingle.addressId};
         this.addressModel.UpdateAddress(request).subscribe((data)=>{
          console.log(data);
          alert("Address Updated Successfully");
          this.GetAllEmployee();
        })
    }
  }
  GetAllEmployee(){
    this.empoyeeService.GetEmployeeById(this.employeeId).subscribe((data:GetEmployeeById)=>{
      console.log("address data",data);
    this.addressData?.set(data.employee.addresses);
    })
  }
  DeleteAddress(id:number){
    this.addressModel.DeleteAddress(id).subscribe((data)=>{
      console.log(data);
      alert("Address Deleted Successfully");
      this.GetAllEmployee();
    })
  }
  EditAddress(){
    this.addressModel.UpdateAddress(this.addressForm.value).subscribe((data)=>{
      console.log(data);
      alert("Address Updated Successfully");
      this.GetAllEmployee();
    })}
    GetAddressById(id:number){
      this.addressModel.GetAddressById(id).subscribe((data)=>{
        console.log("GetAddressById",data);
        this.addressDataSingle = data.address;
            // Populate form with selected address data
    this.addressForm.patchValue({
      buildingNo: data.address.buildingNo,
      apartment: data.address.apartment,
      street: data.address.street,
      employeeId: data.address.employeeId
    });
      })
    }
}
