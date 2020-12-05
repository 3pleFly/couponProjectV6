import { Company } from './../../../models/company.module';
import { AdminService } from './../../../services/method/user/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  companiesUI: boolean;
  customersUI: boolean;
  categoriesUI: boolean;


  constructor() {}

  ngOnInit(): void {

  }

  showCompaniesUI() {
    this.companiesUI = true;
  }

  showCustomersUI() {}

  showCategoriesUI() {}
}
