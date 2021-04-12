import { TestBed } from '@angular/core/testing';

import { MyToastService } from './my-toast.service';

describe('MyToastService', () => {
  let service: MyToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
