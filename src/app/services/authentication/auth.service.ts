import { Scope } from './../../models/scope.enum';
import { ResponseDto } from './../../models/responseDto.module';
import { AuthRequest } from './../../models/authRequest.module';
import { authorization, baseUrl } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userScope: string;

  constructor(private http: HttpClient) {}

  login(authRequest: AuthRequest): Observable<ResponseDto<string>> {
    return this.http
      .post(`${baseUrl}/public/authenticate`, authRequest)
      .pipe(
        tap((response: ResponseDto<string>) => this.storeTokens(response.t))
      );
  }

  logout(): void {
    localStorage.removeItem(authorization);
  }

  getJwtToken(): string {
    return localStorage.getItem(authorization);
  }

  decodeJwt(token: string): any {
    return jwt_decode(token);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getSubject(): string {
    if (this.isLoggedIn()) {
      return this.decodeJwt(this.getJwtToken()).sub;
    }
  }

  getScope(): string {
    if (this.isLoggedIn()) {
      const jwtScope = this.decodeJwt(this.getJwtToken()).scope;
      if (jwtScope in Scope) {
        return jwtScope;
      } else {
        return null;
      }
    }
  }

  private storeTokens(responseToken: string): void {
    localStorage.setItem(authorization, responseToken);
  }
}
