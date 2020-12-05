import { notChooseCategoryRegEx } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.module';
import { AdminService } from 'src/app/services/method/user/admin.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnInit {
  selectedCategory: Category;
  serverMessage: string;
  allCategories: Category[];

  deleteCategoryFormProfile = this.formBuilder.group({
    category: ['', Validators.pattern(notChooseCategoryRegEx)],
  });

  controls = {
    category: this.deleteCategoryFormProfile.get('category')
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

  getSelectedCategory(name: string): Category {
    return this.allCategories.find((category) => category.category === name);
  }

  setSelectCategory(selected: any): void {
    if (selected !== 'Choose Category') {
      this.selectedCategory = this.getSelectedCategory(
        this.deleteCategoryFormProfile.value.category
      );
    } else {
      this.selectedCategory = null;
    }
  }

  deleteCategory(): void {
    if (this.selectedCategory) {
      const confirmation = confirm('Are you sure?');
      if (confirmation) {
        this.adminService.deleteCategory(this.selectedCategory.id).subscribe(
          (response) => (this.serverMessage = response.message),
          (error) => (this.serverMessage = error.error.message),
          () => {
            this.adminService
              .getAllCategories()
              .subscribe((response) =>
                this.adminService.subjectForAllCategories.next(response.t)
              );
            this.selectedCategory = null;
            this.deleteCategoryFormProfile.reset();
            setTimeout(() => {
              this.serverMessage = null;
            }, 5000);
          }
        );
      }
    }
  }
}
