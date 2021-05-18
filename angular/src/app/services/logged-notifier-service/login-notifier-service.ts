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
export class LoginNotifierService {

  serverAuthenticationApi = '';
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }

  setLoggedInStatus(input: boolean) {
    this.loggedIn.next(input);
  }

  getLoggedInStatus(): Observable<any> {
    return this.loggedIn.asObservable();
  }

}
