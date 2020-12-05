import { Scope } from './../../models/scope.enum';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginDirectorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn()) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return false;
    }
    if (state.url !==  '/' + this.authService.getScope().toLowerCase()) {
      this.router.navigate([`/${this.authService.getScope().toLowerCase()}`]);
    }
    return true;
  }
}
