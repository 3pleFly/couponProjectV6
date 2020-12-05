import { Customer } from './../../../../../models/customer.module';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/method/user/admin.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss'],
})
export class ViewCustomersComponent implements OnInit {
  allCustomers: Customer[];
  searchedCustomer: Customer;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllCustomers().subscribe((response) => {
      this.allCustomers = response.t;
    });

    this.adminService.subjectForAllCustomers.subscribe((companies) => {
      this.allCustomers = companies;
    });
  }

  searchCustomer(searchInput): void {
    if (searchInput.value) {
      this.adminService
        .getOneCustomer(searchInput.value)
        .subscribe((response) => {
          this.searchedCustomer = response.t;
        });
    }
  }

  clear(): void {
    this.searchedCustomer = null;
  }
}
