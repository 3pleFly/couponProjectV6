import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company.module';
import { AdminService } from 'src/app/services/method/user/admin.service';
import { emailRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss'],
})
export class UpdateCompanyComponent implements OnInit {
  serverMessage: string;
  allCompanies: Company[];
  selectedCompany: Company;
  updateCompanyFormProfile = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(emailRegEx),
        Validators.maxLength(100),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(200)],
    ],
  });

  controls = {
    email: this.updateCompanyFormProfile.get('email'),
    password: this.updateCompanyFormProfile.get('password'),
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
  setCompanyInputDetails(selected: any): void {
    if (selected !== 'Choose Company') {
      this.selectedCompany = this.getSelectedCompany(selected);
      this.updateCompanyFormProfile.controls.email.setValue(
        this.selectedCompany.email
      );
    } else {
      this.selectedCompany = null;
    }
  }

  getSelectedCompany(name: string): Company {
    return this.allCompanies.find((company) => company.name === name);
  }

  editCompany(): void {
    const company: Company = {
      id: this.selectedCompany.id,
      name: this.selectedCompany.name,
      email: this.updateCompanyFormProfile.value.email,
      password: this.updateCompanyFormProfile.value.password,
      coupons: [],
    };
    this.adminService.updateCompany(company).subscribe(
      (response) => (this.serverMessage = response.message),
      (error) => (this.serverMessage = error.error.message),
      () => {
        this.adminService.getAllCompanies().subscribe((response) => {
          console.log('here.');
          this.adminService.subjectForAllCompanies.next(response.t);
          this.allCompanies = response.t;
        });
        this.updateCompanyFormProfile.reset();
        this.selectedCompany = null;
        setTimeout(() => {
          this.serverMessage = null;
        }, 5000);
      }
    );
  }
}
