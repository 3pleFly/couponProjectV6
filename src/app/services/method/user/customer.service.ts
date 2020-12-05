import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Coupon } from 'src/app/models/coupon.module';
import { Customer } from 'src/app/models/customer.module';
import { ResponseDto } from 'src/app/models/responseDto.module';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  subjectForAllCustomerCoupons: Subject<Coupon[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  purchaseCoupon(couponID: number): Observable<ResponseDto<string>> {
    const url = `${baseUrl}/customers/purchase/${couponID}`;
    return this.httpClient.post<ResponseDto<string>>(url, null);
  }

  removePurchase(couponID: number): Observable<ResponseDto<string>> {
    const url = `${baseUrl}/customers/remove/${couponID}`;
    return this.httpClient.post<ResponseDto<string>>(url, null);
  }

  getCustomerCoupons(): Observable<ResponseDto<Coupon[]>> {
    const url = `${baseUrl}/customers/coupons`;
    return this.httpClient.get<ResponseDto<Coupon[]>>(url);
  }

  getCustomerCouponsByCategory(
    categoryName: string
  ): Observable<ResponseDto<Coupon[]>> {
    const url = `${baseUrl}/customers/coupons/category/${categoryName}`;
    return this.httpClient.get<ResponseDto<Coupon[]>>(url);
  }

  getCustomerCouponsByPrice(
    maxPrice: number
  ): Observable<ResponseDto<Coupon[]>> {
    const url = `${baseUrl}/customers/coupons/price/${maxPrice}`;
    return this.httpClient.get<ResponseDto<Coupon[]>>(url);
  }

  getCustomerDetails(): Observable<ResponseDto<Customer>> {
    const url = `${baseUrl}/customers/details`;
    return this.httpClient.get<ResponseDto<Customer>>(url);
  }


}
