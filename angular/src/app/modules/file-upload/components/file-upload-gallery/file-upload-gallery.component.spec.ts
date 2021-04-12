import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadGalleryComponent } from './file-upload-gallery.component';

describe('FileUploadGalleryComponent', () => {
  let component: FileUploadGalleryComponent;
  let fixture: ComponentFixture<FileUploadGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
