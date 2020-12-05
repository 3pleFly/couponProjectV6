import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.module';
import { AdminService } from 'src/app/services/method/user/admin.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  serverMessage: string;
  allCategories: Category[];
  selectedCategory: Category;

  editCategoryFormProfile = this.formBuilder.group({
    category: [null, Validators.required],
  });

  controls = {
    category: this.editCategoryFormProfile.get('category'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllCategories()
      .subscribe((response) => (this.allCategories = response.t));
  }

  setCategoryInputDetails(selected: any): void {
    if (selected !== 'Choose Category') {
      this.selectedCategory = this.getSelectedCategory(selected);
    } else {
      this.selectedCategory = null;
    }
  }

  getSelectedCategory(name: string): Category {
    return this.allCategories.find((category) => category.category === name);
  }

  editCategory(): void {
    if (this.selectedCategory) {
      const category: Category = {
        id: this.selectedCategory.id,
        category: this.editCategoryFormProfile.value.category,
      };

      this.adminService.updateCategory(category).subscribe(
        (response) => (this.serverMessage = response.message),
        (error) => (this.serverMessage = error.error.message),
        () => {
          this.adminService.getAllCategories().subscribe((response) => {
            this.adminService.subjectForAllCategories.next(response.t);
            this.allCategories = response.t;
          });
          this.editCategoryFormProfile.reset();
          this.selectedCategory = null;
          setTimeout(() => {
            this.serverMessage = null;
          }, 5000);
        }
      );
    }
  }

}
