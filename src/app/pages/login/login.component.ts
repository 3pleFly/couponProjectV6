import { AuthRequest } from './../../models/authRequest.module';
import { AuthService } from './../../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  controls = {
    username: this.loginForm.get('username'),
    password: this.loginForm.get('password'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login(): void {
    const authRequest = new AuthRequest(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.authService.login(authRequest).subscribe(
      () => this.router.navigate(['/customer']),
      (error) => (this.errorMessage = error.error.message)
    );
  }
}
