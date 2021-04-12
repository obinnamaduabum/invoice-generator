import {Observable, of} from 'rxjs';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export function CustomEmailValidator(control: AbstractControl) {

  const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!control.valueChanges || control.pristine) {
    return of(null);
  } else if (emailFormat.test(control.value)) {
    return;
  } else {
    return { emailInvalid: true };
  }
}

// return control.valueChanges
//   .debounceTime(300)
//   .distinctUntilChanged()
//   .take(1)
//   .switchMap(value => this.unitService.isNameTaken(value))
//   .do(() => control.markAsTouched())
//   .map(isTaken => isTaken ? {nameTaken: true} : null);
