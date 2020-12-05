import { Company } from './../../../../../models/company.module';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/method/user/admin.service';
import { emailRegEx } from 'src/environments/environment';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  serverMessage: string;

  addCompanyFormProfile = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
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
    name: this.addCompanyFormProfile.get('name'),
    email: this.addCompanyFormProfile.get('email'),
    password: this.addCompanyFormProfile.get('password'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  addCompany(): void {
    const company: Company = {
      id: 0,
      name: this.addCompanyFormProfile.value.name,
      email: this.addCompanyFormProfile.value.email,
      password: this.addCompanyFormProfile.value.password,
      coupons: [],
    };
    this.adminService.addCompany(company).subscribe(
      (response) => (this.serverMessage = response.message),
      (error) => (this.serverMessage = error.error.message),
      () => {
        this.adminService.getAllCompanies().subscribe((response) => {
          this.addCompanyFormProfile.reset();
          this.adminService.subjectForAllCompanies.next(response.t);
        });
        this.timeOutMessage();
      }
    );
  }

  timeOutMessage(): void {
    setTimeout(() => {
      this.serverMessage = null;
    }, 5000);
  }
}
