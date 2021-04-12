import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreatorComponent } from './invoice-creator.component';

describe('InvoiceCreatorComponent', () => {
  let component: InvoiceCreatorComponent;
  let fixture: ComponentFixture<InvoiceCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
