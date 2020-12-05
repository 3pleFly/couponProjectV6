import { Coupon } from './../../../models/coupon.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category.module';
import { ResponseDto } from 'src/app/models/responseDto.module';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  subjectForGetAllCoupons: Subject<Coupon[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<ResponseDto<Category[]>> {
    const url = `${baseUrl}/public/categories`;
    return this.httpClient.get<ResponseDto<Category[]>>(url);
  }

  getAllCoupons(): Observable<ResponseDto<Coupon[]>> {
    const url = `${baseUrl}/public/coupons`;
    return this.httpClient.get<ResponseDto<Coupon[]>>(url);
  }

}
