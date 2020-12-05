import { notChooseCouponRegEx } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon.module';
import { CompanyService } from 'src/app/services/method/user/company.service';

@Component({
  selector: 'app-delete-coupon',
  templateUrl: './delete-coupon.component.html',
  styleUrls: ['./delete-coupon.component.scss'],
})
export class DeleteCouponComponent implements OnInit {
  selectedCoupon: Coupon;
  serverMessage: string;
  allCoupons: Coupon[];

  deleteCouponFormProfile = this.formBuilder.group({
    couponTitle: ['', Validators.pattern(notChooseCouponRegEx)],
  });

  controls = {
    couponTitle: this.deleteCouponFormProfile.get('couponTitle'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService
      .getCompanyCoupons()
      .subscribe((response) => (this.allCoupons = response.t));
  }

  getSelectedCoupon(title: string): Coupon {
    return this.allCoupons.find((coupon) => coupon.title === title);
  }

  setCoupon(selected: any): void {
    if (selected !== 'Choose Coupon') {
      this.selectedCoupon = this.getSelectedCoupon(
        this.deleteCouponFormProfile.value.couponTitle
      );
    } else {
      this.selectedCoupon = null;
    }
  }

  deleteCoupon(): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.companyService.deleteCoupon(this.selectedCoupon.id).subscribe(
        (response) => (this.serverMessage = response.message),
        (error) => (this.serverMessage = error.error.message),
        () => {
          this.companyService.getCompanyCoupons().subscribe((response) => {
            this.companyService.subjectForAllCoupons.next(response.t);
            this.allCoupons = response.t;
          });
          this.selectedCoupon = null;
          this.deleteCouponFormProfile.reset();
          setTimeout(() => {
            this.serverMessage = null;
          }, 5000);
        }
      );
    }
  }
}
