import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../Services/address';

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
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }
    SubmitForm(): void {

    if (this.addressForm.invalid) {

      this.addressForm.markAllAsTouched();

      return;
    }

    console.log(this.addressForm.value);
  }

}
