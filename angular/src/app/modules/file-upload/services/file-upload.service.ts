import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
  withCredentials: true,
};

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
