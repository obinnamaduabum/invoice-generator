import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePreviewDialogComponent } from './invoice-preview-dialog.component';

describe('InvoicePreviewDialogComponent', () => {
  let component: InvoicePreviewDialogComponent;
  let fixture: ComponentFixture<InvoicePreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePreviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
