import { JwtInterceptor } from './services/interceptor/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CouponDisplayComponent } from './components/coupon-display/coupon-display.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './pages/ui/admin/admin.component';
import { AddCompanyComponent } from './pages/ui/admin/companymethods/add-company/add-company.component';
import { UpdateCompanyComponent } from './pages/ui/admin/companymethods/update-company/update-company.component';
import { DeleteCompanyComponent } from './pages/ui/admin/companymethods/delete-company/delete-company.component';
import { ViewCompaniesComponent } from './pages/ui/admin/companymethods/view-companies/view-companies.component';
import { ViewCustomersComponent } from './pages/ui/admin/customermethods/view-customers/view-customers.component';
import { UpdateCustomerComponent } from './pages/ui/admin/customermethods/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './pages/ui/admin/customermethods/delete-customer/delete-customer.component';
import { AddCustomerComponent } from './pages/ui/admin/customermethods/add-customer/add-customer.component';
import { ViewCategoriesComponent } from './pages/ui/admin/categorymethods/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/ui/admin/categorymethods/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/ui/admin/categorymethods/update-category/update-category.component';
import { DeleteCategoryComponent } from './pages/ui/admin/categorymethods/delete-category/delete-category.component';
import { CustomerComponent } from './pages/ui/customer/customer.component';
import { CompanyComponent } from './pages/ui/company/company.component';
import { ViewCouponsComponent } from './pages/ui/company/couponmethods/view-coupons/view-coupons.component';
import { AddCouponComponent } from './pages/ui/company/couponmethods/add-coupon/add-coupon.component';
import { UpdateCouponComponent } from './pages/ui/company/couponmethods/update-coupon/update-coupon.component';
import { DeleteCouponComponent } from './pages/ui/company/couponmethods/delete-coupon/delete-coupon.component';
import { AddPurchaseComponent } from './pages/ui/customer/couponmethods/add-purchase/add-purchase.component';
import { RemovePurchaseComponent } from './pages/ui/customer/couponmethods/remove-purchase/remove-purchase.component';
import { ViewCustomerCouponsComponent } from './pages/ui/customer/couponmethods/view-customer-coupons/view-customer-coupons.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TopbarComponent,
    CouponDisplayComponent,
    LoginComponent,
    AdminComponent,
    ViewCompaniesComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    ViewCompaniesComponent,
    ViewCustomersComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    AddCustomerComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    CustomerComponent,
    CompanyComponent,
    ViewCouponsComponent,
    AddCouponComponent,
    UpdateCouponComponent,
    DeleteCouponComponent,
    AddPurchaseComponent,
    RemovePurchaseComponent,
    ViewCustomerCouponsComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
