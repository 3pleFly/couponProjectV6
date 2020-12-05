import { Category } from './../../../../../models/category.module';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/method/user/admin.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss'],
})
export class ViewCategoriesComponent implements OnInit {
  allCategories: Category[];
  searchedCategory: Category;
  serverMessage: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllCategories().subscribe((response) => {
      this.allCategories = response.t;
    });

    this.adminService.subjectForAllCategories.subscribe((companies) => {
      this.allCategories = companies;
    });
  }

  searchCategory(searchInput): void {
    if (searchInput.value) {
      this.adminService.getOneCategory(searchInput.value).subscribe(
        (response) => (this.searchedCategory = response.t),
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
    this.searchedCategory = null;
  }
}
