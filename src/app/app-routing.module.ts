import { LoginGuard } from './services/guard/login.guard';
import { RemovePurchaseComponent } from './pages/ui/customer/couponmethods/remove-purchase/remove-purchase.component';
import { AddPurchaseComponent } from './pages/ui/customer/couponmethods/add-purchase/add-purchase.component';
import { ViewCustomerCouponsComponent } from './pages/ui/customer/couponmethods/view-customer-coupons/view-customer-coupons.component';
import { DeleteCouponComponent } from './pages/ui/company/couponmethods/delete-coupon/delete-coupon.component';
import { UpdateCouponComponent } from './pages/ui/company/couponmethods/update-coupon/update-coupon.component';
import { AddCouponComponent } from './pages/ui/company/couponmethods/add-coupon/add-coupon.component';
import { ViewCouponsComponent } from './pages/ui/company/couponmethods/view-coupons/view-coupons.component';
import { DeleteCategoryComponent } from './pages/ui/admin/categorymethods/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './pages/ui/admin/categorymethods/update-category/update-category.component';
import { AddCategoryComponent } from './pages/ui/admin/categorymethods/add-category/add-category.component';
import { ViewCategoriesComponent } from './pages/ui/admin/categorymethods/view-categories/view-categories.component';
import { DeleteCustomerComponent } from './pages/ui/admin/customermethods/delete-customer/delete-customer.component';
import { UpdateCustomerComponent } from './pages/ui/admin/customermethods/update-customer/update-customer.component';
import { AddCustomerComponent } from './pages/ui/admin/customermethods/add-customer/add-customer.component';
import { ViewCustomersComponent } from './pages/ui/admin/customermethods/view-customers/view-customers.component';
import { ViewCompaniesComponent } from './pages/ui/admin/companymethods/view-companies/view-companies.component';
import { DeleteCompanyComponent } from './pages/ui/admin/companymethods/delete-company/delete-company.component';
import { UpdateCompanyComponent } from './pages/ui/admin/companymethods/update-company/update-company.component';
import { AddCompanyComponent } from './pages/ui/admin/companymethods/add-company/add-company.component';
import { CustomerComponent } from './pages/ui/customer/customer.component';
import { CompanyComponent } from './pages/ui/company/company.component';
import { LoginDirectorGuard } from './services/guard/login-director.guard';
import { AdminComponent } from './pages/ui/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginDirectorGuard],
    children: [
      {
        path: '',
        component: ViewCompaniesComponent,
        children: [
          { path: 'add', component: AddCompanyComponent },
          { path: 'update', component: UpdateCompanyComponent },
          { path: 'delete', component: DeleteCompanyComponent },
        ],
      },
      {
        path: 'customers',
        component: ViewCustomersComponent,
        children: [
          { path: 'add', component: AddCustomerComponent },
          { path: 'update', component: UpdateCustomerComponent },
          { path: 'delete', component: DeleteCustomerComponent },
        ],
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
        children: [
          { path: 'add', component: AddCategoryComponent },
          { path: 'update', component: UpdateCategoryComponent },
          { path: 'delete', component: DeleteCategoryComponent },
        ],
      },
    ],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [LoginDirectorGuard],
    children: [
      {
        path: '',
        component: ViewCouponsComponent,
        children: [
          { path: 'add', component: AddCouponComponent },
          { path: 'update', component: UpdateCouponComponent },
          { path: 'delete', component: DeleteCouponComponent },
        ],
      },
    ],
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [LoginDirectorGuard],
    children: [
      {
        path: '',
        component: ViewCustomerCouponsComponent,
        children: [
          { path: 'purchase', component: AddPurchaseComponent },
          { path: 'remove', component: RemovePurchaseComponent },
        ],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
