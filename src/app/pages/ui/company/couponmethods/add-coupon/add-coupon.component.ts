import { PublicService } from './../../../../../services/method/public/public.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.module';
import { Company } from 'src/app/models/company.module';
import { Coupon } from 'src/app/models/coupon.module';
import { CompanyService } from 'src/app/services/method/user/company.service';
import { notChooseCategoryRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
})
export class AddCouponComponent implements OnInit {
  serverMessage: string;
  allCoupons: Coupon[];
  currentCompany: Company;
  selectedCategory: string;
  allCategories: Category[];

  addCouponFormProfile = this.formBuilder.group({
    categoryName: ['', [Validators.pattern(notChooseCategoryRegEx)]],
    title: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', Validators.maxLength(100)],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    price: ['', [Validators.required]],
    image: [''],
  });

  controls = {
    categoryName: this.addCouponFormProfile.get('categoryName'),
    title: this.addCouponFormProfile.get('title'),
    description: this.addCouponFormProfile.get('description'),
    startDate: this.addCouponFormProfile.get('startDate'),
    endDate: this.addCouponFormProfile.get('endDate'),
    amount: this.addCouponFormProfile.get('amount'),
    price: this.addCouponFormProfile.get('price'),
    image: this.addCouponFormProfile.get('image'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.companyService
      .getCompanyDetails()
      .subscribe((response) => (this.currentCompany = response.t));
    this.publicService
      .getAllCategories()
      .subscribe((response) => (this.allCategories = response.t));
  }

  setCategory(selected: any): void {
    if (selected !== 'Choose Category') {
      this.selectedCategory = selected;
    } else {
      this.selectedCategory = null;
    }
  }

  addCoupon(): void {
    const coupon: Coupon = {
      id: null,
      categoryName: this.selectedCategory,
      companyID: this.currentCompany.id,
      title: this.addCouponFormProfile.value.title,
      description: this.addCouponFormProfile.value.description,
      startDate: this.addCouponFormProfile.value.startDate,
      endDate: this.addCouponFormProfile.value.endDate,
      amount: this.addCouponFormProfile.value.amount,
      price: this.addCouponFormProfile.value.price,
      image: this.addCouponFormProfile.value.image,
    };
    this.companyService.addCoupon(coupon).subscribe(
      (response) => (this.serverMessage = response.message),
      (error) => (this.serverMessage = error.error.message),
      () => {
        this.companyService.getCompanyCoupons().subscribe((response) => {
          this.companyService.subjectForAllCoupons.next(response.t);
          this.allCoupons = response.t;
        });
        this.addCouponFormProfile.reset();
        this.timeOutMessage();
      }
    );
  }

  timeOutMessage(): void {
    setTimeout(() => {
      this.serverMessage = null;
    }, 5000);
  }

}

