import {AbstractControl} from "@angular/forms";
import {of} from "rxjs";

export function MyEmailValidator(control: AbstractControl) {

  const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!control.valueChanges || control.pristine) {
    return of(null);
  } else if (emailFormat.test(control.value)) {
    return;
  } else {
    return { emailInvalid: true };
  }
}
