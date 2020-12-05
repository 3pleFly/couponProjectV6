import { TestBed } from '@angular/core/testing';

import { LoginDirectorGuard } from './login-director.guard';

describe('LoginDirectorGuard', () => {
  let guard: LoginDirectorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginDirectorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
