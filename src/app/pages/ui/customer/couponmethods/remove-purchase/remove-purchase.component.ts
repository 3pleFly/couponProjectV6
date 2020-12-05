import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon.module';
import { PublicService } from 'src/app/services/method/public/public.service';
import { CustomerService } from 'src/app/services/method/user/customer.service';
import { notChooseCouponRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-remove-purchase',
  templateUrl: './remove-purchase.component.html',
  styleUrls: ['./remove-purchase.component.scss'],
})
export class RemovePurchaseComponent implements OnInit {
  selectedCoupon: Coupon;
  serverMessage: string;
  allCoupons: Coupon[];

  purchaseCouponFormProfile = this.formBuilder.group({
    couponTitle: ['', Validators.pattern(notChooseCouponRegEx)],
  });

  controls = {
    couponTitle: this.purchaseCouponFormProfile.get('couponTitle'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCustomerCoupons()
      .subscribe((response) => (this.allCoupons = response.t));
    this.customerService.subjectForAllCustomerCoupons.subscribe(
      (coupons) => (this.allCoupons = coupons)
    );
  }

  getSelectedCoupon(title: string): Coupon {
    return this.allCoupons.find((coupon) => coupon.title === title);
  }

  setCoupon(selected: any): void {
    if (selected !== 'Choose Coupon') {
      this.selectedCoupon = this.getSelectedCoupon(
        this.purchaseCouponFormProfile.value.couponTitle
      );
    } else {
      this.selectedCoupon = null;
    }
  }

  removePurchase(): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.customerService.removePurchase(this.selectedCoupon.id).subscribe(
        (response) => (this.serverMessage = response.message),
        (error) => (this.serverMessage = error.error.message),
        () => {
          this.customerService.getCustomerCoupons().subscribe((response) => {
            this.customerService.subjectForAllCustomerCoupons.next(response.t);
            this.allCoupons = response.t;
          });
          this.selectedCoupon = null;
          this.purchaseCouponFormProfile.reset();
          setTimeout(() => {
            this.serverMessage = null;
          }, 5000);
        }
      );
    }
  }
}
