import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
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
export class InvoiceTemplateService {

  serverAuthenticationApi = '';
  public templateInfo: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public justUpdated: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }


  setJustUpdated(value: boolean) {
    this.justUpdated.next(value);
  }

  getJustUpdated() {
   return this.justUpdated.asObservable();
  }

  set(value: any) {
    this.templateInfo.next(value);
  }

  get(): Observable<any> {
    return this.templateInfo.asObservable();
  }

  index(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi + `/api/v1/protected/invoice-template`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  create(input: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi + `/api/v1/protected/invoice-template/create`, input, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }
}
