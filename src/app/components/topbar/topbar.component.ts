import { Category } from './../../models/category.module';
import { PublicService } from './../../services/method/public/public.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  loggedUser: string;
  userMessage: boolean;
  allCategories: Category[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getSubject();
    this.publicService
      .getAllCategories()
      .subscribe((response) => (this.allCategories = response.t));
  }

  signOut(): void {
    this.loggedUser = null;
    this.authService.logout();
    this.userMessage = true;
    setTimeout(() => {
      this.userMessage = null;
    }, 2500);
    this.router.navigate(['/home']);
  }
}
