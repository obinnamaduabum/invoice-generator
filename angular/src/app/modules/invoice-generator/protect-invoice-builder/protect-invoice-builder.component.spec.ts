import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectInvoiceBuilderComponent } from './protect-invoice-builder.component';

describe('ProtectInvoiceBuilderComponent', () => {
  let component: ProtectInvoiceBuilderComponent;
  let fixture: ComponentFixture<ProtectInvoiceBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectInvoiceBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectInvoiceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
