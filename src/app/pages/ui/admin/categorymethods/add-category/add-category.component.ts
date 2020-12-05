import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.module';
import { AdminService } from 'src/app/services/method/user/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  serverMessage: string;
  addCategoryFormProfile = this.formBuilder.group({
    category: [null, Validators.required],
  });

  controls = {
    category: this.addCategoryFormProfile.get('category'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  addCategory(): void {
    const category: Category = {
      id: 0,
      category: this.addCategoryFormProfile.value.category,
    };
    this.adminService.addCategory(category).subscribe(
      (response) => (this.serverMessage = response.message),
      (error) => (this.serverMessage = error.error.message),
      () => {
        this.adminService
          .getAllCategories()
          .subscribe((response) =>
            this.adminService.subjectForAllCategories.next(response.t)
          );
        setTimeout(() => {
          this.addCategoryFormProfile.reset();
          this.serverMessage = null;
        }, 5000);
      }
    );
  }

}
