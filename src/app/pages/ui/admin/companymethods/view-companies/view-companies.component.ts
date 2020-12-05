import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.module';
import { AdminService } from 'src/app/services/method/user/admin.service';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.scss'],
})
export class ViewCompaniesComponent implements OnInit {
  allCompanies: Company[];
  searchedCompany: Company;
  serverMessage: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllCompanies().subscribe((response) => {
      this.allCompanies = response.t;
    });

    this.adminService.subjectForAllCompanies.subscribe((companies) => {
      this.allCompanies = companies;
    });
  }

  searchCompany(searchInput): void {
    if (searchInput.value) {
      this.adminService.getOneCompany(searchInput.value).subscribe(
        (response) => (this.searchedCompany = response.t),
        (error) => {
          this.serverMessage = error.error.message;
          this.timeOutMessage();
        }
      );
    }
  }

  timeOutMessage(): void {
    setTimeout(() => {
      this.serverMessage = null;
    }, 2500);
  }

  clear(): void {
    this.searchedCompany = null;
  }
}
