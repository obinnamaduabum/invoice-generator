import { TestBed } from '@angular/core/testing';

import { LoginComponentHandlerService } from './login-component-handler.service';

describe('LoginComponentHandlerService', () => {
  let service: LoginComponentHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginComponentHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
