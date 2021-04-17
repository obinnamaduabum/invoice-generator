import { Component, OnInit } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  file: any = null;
  uploadingFile = false;
  fileName: string = "No file selected";

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
    if(this.file) {
      this.fileName = this.file.name;
    }
  }

  uploadFile() {
    const file = this.file;
    file.inProgress = true;
    const formData = new FormData();

    console.log(file);
    formData.append('logo', file);

    this.uploadingFile = true;
    this.fileUploadService.upload(formData).pipe(map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`Upload failed: `);

      })).subscribe((event: any) => {

      if (typeof (event) === 'object') {
        console.log(event.body);
        this.uploadingFile = false;
      }
    });
  }
}
