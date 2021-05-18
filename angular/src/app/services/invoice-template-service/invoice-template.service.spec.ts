import { TestBed } from '@angular/core/testing';

import { InvoiceTemplateService } from './invoice-template.service';

describe('InvoiceTemplateService', () => {
  let service: InvoiceTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
