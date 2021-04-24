import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
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
export class ClientService {

  serverAuthenticationApi = '';
  public selectedClient: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }

  setSelectedClient(input: any) {
    this.selectedClient.next(input);
  }

  getSelectedClient(): Observable<any> {
    return this.selectedClient.asObservable();
  }

  index(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi + `/api/v1/protected/client`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  create(input: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi + `/api/v1/protected/client/create`, input, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

}
