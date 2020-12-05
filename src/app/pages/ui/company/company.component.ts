import { Company } from './../../../models/company.module';
import { CompanyService } from './../../../services/method/user/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: Company;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(response => {
      this.company = response.t;
    });
  }

}
