import { CustomerService } from './../../../services/method/user/customer.service';
import { Customer } from './../../../models/customer.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customer: Customer;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customer = response.t;
    });

    this.customerService.subjectForAllCustomerCoupons.subscribe(
      (coupons) => (this.customer.coupons = coupons)
    );
  }
}
