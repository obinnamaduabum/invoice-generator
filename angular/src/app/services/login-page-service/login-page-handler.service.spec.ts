import { TestBed } from '@angular/core/testing';

import { LoginPageHandlerService } from './login-page-handler.service';

describe('LoginPageHandlerService', () => {
  let service: LoginPageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
