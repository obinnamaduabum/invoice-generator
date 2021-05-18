import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  serverAuthenticationApi = '';

  constructor(private httpClient: HttpClient) {
    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }

  upload(formData: any) {
    const url = this.serverAuthenticationApi + `/api/v1/protected/file-upload/upload`;
    return this.httpClient.post(url, formData,{
      headers:{
        'Access-Control-Allow-Origin': '*',
      },
      reportProgress: true,
      observe: 'events'
    });
  }
}
