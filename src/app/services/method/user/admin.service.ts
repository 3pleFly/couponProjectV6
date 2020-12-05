import { Category } from './../../../models/category.module';
import { Customer } from './../../../models/customer.module';
import { Company } from './../../../models/company.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResponseDto } from 'src/app/models/responseDto.module';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  subjectForAllCompanies: Subject<Company[]> = new Subject();
  subjectForAllCustomers: Subject<Customer[]> = new Subject();
  subjectForAllCategories: Subject<Category[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  addCompany(company: Company): Observable<ResponseDto<Company>> {
    const url = `${baseUrl}/admin/companies/add`;
    return this.httpClient.post<ResponseDto<Company>>(url, company);
  }

  updateCompany(company: Company): Observable<ResponseDto<Company>> {
    const url = `${baseUrl}/admin/companies/update`;
    return this.httpClient.put<ResponseDto<Company>>(url, company);
  }

  deleteCompany(companyID: number): Observable<ResponseDto<string>> {
    const url = `${baseUrl}/admin/companies/delete/${companyID}`;
    return this.httpClient.delete<ResponseDto<string>>(url);
  }

  getOneCompany(companyID: number): Observable<ResponseDto<Company>> {
    const url = `${baseUrl}/admin/companies/company/${companyID}`;
    return this.httpClient.get<ResponseDto<Company>>(url);
  }

  getAllCompanies(): Observable<ResponseDto<Company[]>> {
    const url = `${baseUrl}/admin/companies`;
    return this.httpClient.get<ResponseDto<Company[]>>(url);
  }

  addCustomer(customer: Customer): Observable<ResponseDto<Customer>> {
    const url = `${baseUrl}/admin/customers/add`;
    console.log('trying...');
    console.log(url);
    return this.httpClient.post<ResponseDto<Customer>>(url, customer);
  }

  updateCustomer(customer: Customer): Observable<ResponseDto<Customer>> {
    const url = `${baseUrl}/admin/customers/update`;
    return this.httpClient.put<ResponseDto<Customer>>(url, customer);
  }

  deleteCustomer(customerID: number): Observable<ResponseDto<string>> {
    const url = `${baseUrl}/admin/customers/delete/${customerID}`;
    return this.httpClient.delete<ResponseDto<string>>(url);
  }

  getOneCustomer(customerID: number): Observable<ResponseDto<Customer>> {
    const url = `${baseUrl}/admin/customers/customer/${customerID}`;
    return this.httpClient.get<ResponseDto<Customer>>(url);
  }

  addCategory(category: Category): Observable<ResponseDto<Category>> {
    const url = `${baseUrl}/admin/categories/add`;
    return this.httpClient.post<ResponseDto<Category>>(url, category);
  }

  updateCategory(category: Category): Observable<ResponseDto<Category>> {
    const url = `${baseUrl}/admin/categories/update`;
    return this.httpClient.put<ResponseDto<Category>>(url, category);
  }

  deleteCategory(categoryID: number): Observable<ResponseDto<string>> {
    const url = `${baseUrl}/admin/categories/delete/${categoryID}`;
    return this.httpClient.delete<ResponseDto<string>>(url);
  }

  getOneCategory(categoryID: number): Observable<ResponseDto<Category>> {
    const url = `${baseUrl}/admin/categories/category/${categoryID}`;
    return this.httpClient.get<ResponseDto<Category>>(url);
  }

  getAllCustomers(): Observable<ResponseDto<Customer[]>> {
    const url = `${baseUrl}/admin/customers`;
    return this.httpClient.get<ResponseDto<Customer[]>>(url);
  }

  getAllCategories(): Observable<ResponseDto<Category[]>> {
    const url = `${baseUrl}/admin/categories`;
    return this.httpClient.get<ResponseDto<Category[]>>(url);
  }
}
