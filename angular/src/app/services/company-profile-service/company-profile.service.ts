import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {CompanyProfileInterface} from "../../../../../backend/src/interface/company_profile_interface";

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
  public selectedCompanyProfile: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }

  setCompanyProfile(value: any) {
    this.selectedCompanyProfile.next(value);
  }

  getCompanyProfile(): Observable<CompanyProfileInterface> {
    return this.selectedCompanyProfile.asObservable();
  }


  index(page: number, limit: number): Observable<any> {
    return this.httpClient.get(`${this.serverAuthenticationApi}/api/v1/protected/company-profile?page=${page}&limit=${limit}`,
      httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

  create(inputObj: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi + `/api/v1/protected/company-profile/create`, inputObj, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

}
