import { PublicService } from './../../../../../services/method/public/public.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.module';
import { Company } from 'src/app/models/company.module';
import { Coupon } from 'src/app/models/coupon.module';
import { CompanyService } from 'src/app/services/method/user/company.service';
import { notChooseCategoryRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.scss']
})
export class UpdateCouponComponent implements OnInit {
  serverMessage: string;
  allCoupons: Coupon[];
  allCategories: Category[];
  currentCompany: Company;
  selectedCategory: Category;
  selectedCoupon: Coupon;

  editCouponFormProfile = this.formBuilder.group({
    categoryName: [null, [Validators.pattern(notChooseCategoryRegEx)]],
    title: [null, [Validators.required, Validators.maxLength(30)]],
    description: [null, Validators.maxLength(30)],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    price: [null, [Validators.required]],
    image: [null],
  });

  controls = {
    categoryName: this.editCouponFormProfile.get('categoryName'),
    title: this.editCouponFormProfile.get('title'),
    description: this.editCouponFormProfile.get('description'),
    startDate: this.editCouponFormProfile.get('startDate'),
    endDate: this.editCouponFormProfile.get('endDate'),
    amount: this.editCouponFormProfile.get('amount'),
    price: this.editCouponFormProfile.get('price'),
    image: this.editCouponFormProfile.get('image'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.publicService
      .getAllCategories()
      .subscribe((response) => (this.allCategories = response.t));
    this.companyService
      .getCompanyDetails()
      .subscribe((response) => (this.currentCompany = response.t));
    this.companyService
      .getCompanyCoupons()
      .subscribe((response) => (this.allCoupons = response.t));
  }

  setCategory(selected: any): void {
    if (selected !== 'Choose Category') {
      this.selectedCategory = this.allCategories.find(
        (category) => category.category === selected
      );
    } else {
      this.selectedCategory = null;
    }
  }

  setCouponInputDetails(selected: any): void {
    if (selected !== 'Choose Coupon') {
      this.selectedCoupon = this.getSelectedCoupon(selected);
      this.editCouponFormProfile.controls.title.setValue(
        this.selectedCoupon.title
      );
      this.editCouponFormProfile.controls.description.setValue(
        this.selectedCoupon.description
      );
      this.editCouponFormProfile.controls.startDate.setValue(
        this.selectedCoupon.startDate
      );
      this.editCouponFormProfile.controls.endDate.setValue(
        this.selectedCoupon.endDate
      );
      this.editCouponFormProfile.controls.amount.setValue(
        this.selectedCoupon.amount
      );
      this.editCouponFormProfile.controls.price.setValue(
        this.selectedCoupon.price
      );
      this.editCouponFormProfile.controls.image.setValue(
        this.selectedCoupon.image
      );
    } else {
      this.selectedCoupon = null;
    }
  }

  getSelectedCoupon(title: string): Coupon {
    return this.allCoupons.find((coupon) => coupon.title === title);

  }

  editCoupon(): void {
    if (this.editCouponFormProfile.valid && this.selectedCategory) {
      const coupon: Coupon = {
        id: this.selectedCoupon.id,
        categoryName: this.selectedCategory.category,
        companyID: this.selectedCoupon.companyID,
        title: this.editCouponFormProfile.value.title,
        description: this.editCouponFormProfile.value.description,
        startDate: this.editCouponFormProfile.value.startDate,
        endDate: this.editCouponFormProfile.value.endDate,
        amount: this.editCouponFormProfile.value.amount,
        price: this.editCouponFormProfile.value.price,
        image: this.editCouponFormProfile.value.image,
      };
      this.companyService.updateCoupon(coupon).subscribe(
        (response) => (this.serverMessage = response.message),
        (error) => (this.serverMessage = error.error.message),
        () => {
          this.companyService.getCompanyCoupons().subscribe((response) => {
            this.companyService.subjectForAllCoupons.next(response.t);
            this.allCoupons = response.t;
          });
          this.selectedCoupon = null;
          this.editCouponFormProfile.reset();
          setTimeout(() => {
            this.serverMessage = null;
          }, 2500);
        }
      );
    }
  }

}
