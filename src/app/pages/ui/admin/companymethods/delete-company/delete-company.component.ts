import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.module';
import { AdminService } from 'src/app/services/method/user/admin.service';
import { notChooseCompanyRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.scss']
})
export class DeleteCompanyComponent implements OnInit {

  selectedCompany: Company;
  serverMessage: string;
  allCompanies: Company[];

  deleteCompanyFormProfile = this.formBuilder.group({
    company: ['', Validators.pattern(notChooseCompanyRegEx)],
  });

  controls =  {
    company: this.deleteCompanyFormProfile.get('company')
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllCompanies()
      .subscribe((response) => (this.allCompanies = response.t));
  }

  getSelectedCompany(name: string): Company {
    return this.allCompanies.find((company) => company.name === name);
  }

  setSelectCompany(selected: any): void {
    if (selected !== 'Choose Company') {
      this.selectedCompany = this.getSelectedCompany(
        this.deleteCompanyFormProfile.value.company
      );
    } else {
      this.selectedCompany = null;
    }
  }

  deleteCompany(): void {
    if (this.selectedCompany) {
      const confirmation = confirm('Are you sure?');
      if (confirmation) {
        this.adminService.deleteCompany(this.selectedCompany.id).subscribe(
          (response) => (this.serverMessage = response.message),
          (error) => (this.serverMessage = error.error.message),
          () => {
            this.adminService.getAllCompanies().subscribe((response) => {
              this.adminService.subjectForAllCompanies.next(response.t);
              this.allCompanies = response.t;
            });
            this.selectedCompany = null;
            this.deleteCompanyFormProfile.reset();
            setTimeout(() => {
              this.serverMessage = null;
            }, 5000);
          }
        );
      }
    }
  }

}
