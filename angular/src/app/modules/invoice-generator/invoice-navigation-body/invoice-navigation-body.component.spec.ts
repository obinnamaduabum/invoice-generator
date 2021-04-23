import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNavigationBodyComponent } from './invoice-navigation-body.component';

describe('InvoiceNavigationBodyComponent', () => {
  let component: InvoiceNavigationBodyComponent;
  let fixture: ComponentFixture<InvoiceNavigationBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceNavigationBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNavigationBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
