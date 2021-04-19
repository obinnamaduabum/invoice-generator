import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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
export class CompanyProfileService {

  serverAuthenticationApi = '';

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }

  create(inputObj: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi + `/api/v1/protected/company-profile/create`, inputObj, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

}
