import { Scope } from './../../models/scope.enum';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Coupon } from 'src/app/models/coupon.module';
import { PublicService } from './../../services/method/public/public.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/method/user/customer.service';

@Component({
  selector: 'app-coupon-display',
  templateUrl: './coupon-display.component.html',
  styleUrls: ['./coupon-display.component.scss'],
})
export class CouponDisplayComponent implements OnInit {
  message: string;
  allCoupons: Coupon[];
  featuredCoupon: Coupon;
  displayedCoupons: Coupon[];

  constructor(
    private publicService: PublicService,
    private authService: AuthService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.publicService.getAllCoupons().subscribe(
      (response) => (this.allCoupons = response.t),
      (error) => (this.message = error.error.message),
      () => (this.displayedCoupons = this.allCoupons)
    );

    this.publicService.subjectForGetAllCoupons.subscribe(
      (coupons) => (this.allCoupons = coupons)
    );
  }

  featureCoupon(coupon: Coupon): void {
    this.featuredCoupon = coupon;
    this.displayedCoupons = [];
  }

  purchaseCoupon(): void {
    if (this.authService.isLoggedIn()) {
      if (this.authService.getScope() !== Scope.CUSTOMER.toString()) {
        this.message = 'Please login as a customer';
      } else {
        this.customerService.purchaseCoupon(this.featuredCoupon.id).subscribe(
          (response) => (this.message = response.message),
          (error) => (this.message = error.error.message),
          () => {
            this.updateCouponArray();
          }
        );
      }
    } else {
      this.message = 'Please login first';
    }
    setTimeout(() => {
      this.message = null;
    }, 2500);
  }

  backToDisplay(): void {
    this.featuredCoupon = null;
    this.displayedCoupons = this.allCoupons;
  }

  updateCouponArray(): void {
    this.publicService.getAllCoupons().subscribe((response) => {
      this.publicService.subjectForGetAllCoupons.next(response.t);
    });
  }
}
