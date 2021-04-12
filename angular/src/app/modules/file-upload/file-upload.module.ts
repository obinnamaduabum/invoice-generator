import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {FileUploadService} from "./services/file-upload.service";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import { FileUploadGalleryComponent } from './components/file-upload-gallery/file-upload-gallery.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadGalleryComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [FileUploadService],
  exports: [FileUploadComponent,
    FileUploadGalleryComponent]
})
export class FileUploadModule { }
