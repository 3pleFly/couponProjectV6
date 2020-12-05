import { PublicService } from './../../../../../services/method/public/public.service';
import { Category } from './../../../../../models/category.module';
import { CompanyService } from './../../../../../services/method/user/company.service';
import { Coupon } from './../../../../../models/coupon.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-coupons',
  templateUrl: './view-coupons.component.html',
  styleUrls: ['./view-coupons.component.scss'],
})
export class ViewCouponsComponent implements OnInit {
  allCategories: Category[];
  allCoupons: Coupon[];
  userMessage: string;

  constructor(
    private companyService: CompanyService,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyCoupons().subscribe((response) => {
      this.allCoupons = response.t;
    });

    this.publicService
      .getAllCategories()
      .subscribe((response) => (this.allCategories = response.t));

    this.companyService.subjectForAllCoupons.subscribe((coupons) => {
      this.allCoupons = coupons;
    });
  }

  filterByPrice(price: HTMLInputElement): void {
    const maxPrice = parseInt(price.value, 10);
    this.companyService.getCompanyCouponsByMaxPrice(maxPrice).subscribe(
      (response) => (this.allCoupons = response.t),
      (error) => (this.userMessage = error.error.message),
      () => this.timeOutMessage()
    );
  }

  filterByCategory(category): void {
    if (category !== 'Choose Category') {
      this.companyService.getCompanyCouponsByCategory(category).subscribe(
        (response) => (this.allCoupons = response.t),
        (error) => (this.userMessage = error.error.message),
        () => this.timeOutMessage()
      );
    }
  }

  timeOutMessage(): void {
    setTimeout(() => {
      this.userMessage = null;
    }, 2500);
  }

  removeFilter(): void {
    this.companyService
      .getCompanyCoupons()
      .subscribe((response) => (this.allCoupons = response.t));
  }
}
