import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllClientsComponent } from './view-all-clients.component';

describe('ViewAllClientsComponent', () => {
  let component: ViewAllClientsComponent;
  let fixture: ComponentFixture<ViewAllClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
