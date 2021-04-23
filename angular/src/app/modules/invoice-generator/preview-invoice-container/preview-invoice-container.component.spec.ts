import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInvoiceContainerComponent } from './preview-invoice-container.component';

describe('PreviewInvoiceContainerComponent', () => {
  let component: PreviewInvoiceContainerComponent;
  let fixture: ComponentFixture<PreviewInvoiceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewInvoiceContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInvoiceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
