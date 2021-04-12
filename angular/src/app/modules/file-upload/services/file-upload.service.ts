import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  upload(formData: any) {
    const url = "";
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
