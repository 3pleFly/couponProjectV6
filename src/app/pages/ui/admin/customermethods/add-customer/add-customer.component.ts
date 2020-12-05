import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/models/customer.module';
import { AdminService } from 'src/app/services/method/user/admin.service';
import { emailRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  serverMessage: string;
  addCustomerFormProfile = this.formBuilder.group({
    firstName: [null, [Validators.required, Validators.maxLength(30)]],
    lastName: [null, [Validators.required, Validators.maxLength(30)]],
    email: [
      null,
      [
        Validators.required,
        Validators.pattern(emailRegEx),
        Validators.maxLength(100),
      ],
    ],
    password: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(200)],
    ],
  });

  controls = {
    firstName: this.addCustomerFormProfile.get('firstName'),
    lastName: this.addCustomerFormProfile.get('lastName'),
    email: this.addCustomerFormProfile.get('email'),
    password: this.addCustomerFormProfile.get('password'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  addCustomer(): void {
      const customer: Customer = {
        id: 0,
        firstName: this.addCustomerFormProfile.value.firstName,
        lastName: this.addCustomerFormProfile.value.lastName,
        email: this.addCustomerFormProfile.value.email,
        password: this.addCustomerFormProfile.value.password,
        coupons: [],
      };
      this.adminService.addCustomer(customer).subscribe(
        (response) => (this.serverMessage = response.message),
        (error) => (this.serverMessage = error.error.message),
        () => {
          this.adminService
            .getAllCustomers()
            .subscribe((response) =>
              this.adminService.subjectForAllCustomers.next(response.t)
            );
          setTimeout(() => {
            this.serverMessage = null;
          }, 5000);
        }
      );
  }
}
