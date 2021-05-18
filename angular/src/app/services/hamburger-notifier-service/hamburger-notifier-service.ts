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
export class HamburgerNotifierService {

  public hamburgerStatus: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  setToggle(input: boolean) {
    this.hamburgerStatus.next(input);
  }

  getHamburgerStatus(): Observable<any> {
    return this.hamburgerStatus.asObservable();
  }

}
