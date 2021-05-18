import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {saveAs} from 'file-saver';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: true
};


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  serverAuthenticationApi = '';

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }

  download(input: any): Observable<any> {
    const url = this.serverAuthenticationApi + `/api/v1/protected/pdf-download/create`;
    let application = 'application/pdf';
    return this.httpClient.post(url, input, {responseType: 'blob', headers: {Accept: application}}).pipe(map((data: any) => {
      return data;
    }));
  }

}
