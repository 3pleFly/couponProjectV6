import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.module';
import { AdminService } from 'src/app/services/method/user/admin.service';
import { notChooseCustomerRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss'],
})
export class DeleteCustomerComponent implements OnInit {
  selectedCustomer: Customer;
  serverMessage: string;
  allCustomers: Customer[];

  deleteCustomerFormProfile = this.formBuilder.group({
    customer: ['', Validators.pattern(notChooseCustomerRegEx)],
  });

  controls = {
    customer: this.deleteCustomerFormProfile.get('customer')
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllCustomers()
      .subscribe((response) => (this.allCustomers = response.t));
  }

  getSelectedCustomer(name: string[]): Customer {
    return this.allCustomers.find(
      (customer) =>
        customer.firstName === name[0] && customer.lastName === name[1]
    );
  }

  setSelectedCustomer(selected: any): void {
    const firstNameAndLastName = this.deleteCustomerFormProfile.value.customer.split(
      ' '
    );
    if (selected !== 'Choose Customer') {
      this.selectedCustomer = this.getSelectedCustomer(firstNameAndLastName);
    } else {
      this.selectedCustomer = null;
    }
  }

  deleteCustomer(): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.adminService.deleteCustomer(this.selectedCustomer.id).subscribe(
        (response) => (this.serverMessage = response.message),
        (error) => (this.serverMessage = error.error.message),
        () => {
          this.adminService
            .getAllCustomers()
            .subscribe((response) =>
              this.adminService.subjectForAllCustomers.next(response.t)
            );
          this.selectedCustomer = null;
          this.deleteCustomerFormProfile.reset();
          setTimeout(() => {
            this.serverMessage = null;
          }, 5000);
        }
      );
    }
  }
}
