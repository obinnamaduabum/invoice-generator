import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ResponseModel} from "../models/response-model";

@Injectable({
  providedIn: 'root'
})
export class ErrorCatcherService {

  private errors: BehaviorSubject<ResponseModel> = new BehaviorSubject(undefined);
  constructor() { }


  getErrors() {
    return this.errors.asObservable();
  }

  setError(value: any) {
    this.errors.next(value);
  }
}
