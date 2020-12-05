import { PublicService } from './../../../../../services/method/public/public.service';
import { Category } from './../../../../../models/category.module';
import { Coupon } from 'src/app/models/coupon.module';
import { CustomerService } from './../../../../../services/method/user/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-customer-coupons',
  templateUrl: './view-customer-coupons.component.html',
  styleUrls: ['./view-customer-coupons.component.scss'],
})
export class ViewCustomerCouponsComponent implements OnInit {
  allCoupons: Coupon[];
  userMessage: string;
  allCategories: Category[];
  displayedCoupons: Coupon[];

  constructor(
    private customerService: CustomerService,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomerCoupons().subscribe((response) => {
      this.allCoupons = response.t;
      this.displayedCoupons = this.allCoupons;
    });

    this.customerService.subjectForAllCustomerCoupons.subscribe((coupons) => {
      this.allCoupons = coupons;
    });

    this.publicService
      .getAllCategories()
      .subscribe((response) => (this.allCategories = response.t));
  }

  filterByPrice(price: HTMLInputElement): void {
    if (price.value) {
      const maxPrice = parseInt(price.value, 10);
      this.customerService.getCustomerCouponsByPrice(maxPrice).subscribe(
        (response) => (this.displayedCoupons = response.t),
        (error) => (this.userMessage = error.error.message),
        () => this.timeOutMessage()
      );
    }
  }

  filterByCategory(category): void {
    if (category !== 'Choose Category') {
      this.customerService.getCustomerCouponsByCategory(category).subscribe(
        (response) => (this.displayedCoupons = response.t),
        (error) => (this.userMessage = error.error.message),
        () => this.timeOutMessage()
      );
    } else {
      this.removeFilter();
    }
  }

  removeFilter(): void {
    this.displayedCoupons = this.allCoupons;
  }

  timeOutMessage(): void {
    setTimeout(() => {
      this.userMessage = null;
    }, 2500);
  }
}
