import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/response-model';

declare const gapi: any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: true
};


@Injectable()
export class AuthenticationService {

  serverAuthenticationApi = '';
  private user: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private ongoingFetch: Observable<any>;
  private initialized: boolean;

  constructor(private httpClient: HttpClient) {

    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }

    this.fetch().subscribe((res => {
      this.initialized = true;
    }), (res => {
      this.initialized = false;
    }));
  }

  clearStaleSession(): void {
    this.initialized = false;
    this.user.next(null);
    console.log('done');
  }

  setUserInfo(data: any): void {
    this.initialized = true;
    this.user.next(data);
    // console.log(this.currentWidth);
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi + `/api/v1/protected/auth/logout`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

  login(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi + `/api/v1/public/auth/login`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  me(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi + `/api/v1/protected/auth/me`, httpOptions).pipe(map((data: any) => {
      this.setUserInfo(data);
      return data;
    }));
  }

  fetchUser(): Observable<any> {
      if (this.initialized) {
        return this.user.asObservable();
      }
      return this.fetch();
  }

  public fetch(): Observable<any> {
    if (!this.ongoingFetch) {
      this.ongoingFetch = this.httpClient.get(this.serverAuthenticationApi + `/api/v1/protected/auth/me`, httpOptions);
      this.ongoingFetch.subscribe((data: ResponseModel) => {
        this.ongoingFetch = null;
        this.user.next(data);
        this.initialized = true;
      }, (err: any) => {
        this.user.next(null);
       // this.portalUser.next(null);
      });
    } else {
      console.log('fetching user ongoing...');
    }

    return this.ongoingFetch;
  }

}
