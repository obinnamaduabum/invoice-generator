import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';
import {PhoneNumberCodes} from '../model/phone-number-codes-model';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function PhoneNumberValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.parent || !control) {
      return;
    }

    let phoneNumberCode: PhoneNumberCodes;
    if (controlName === 'phoneNumber') {
      phoneNumberCode = control.parent.get('selectedPhoneNumber').value;
    }

    let validNumber = false;
    try {
      if (!control.value) {
        return;
      }

      const internalNumber = phoneNumberCode.internationalPhoneNumber;
      const phoneNumberString: string = control.value;
      const alpha2 = phoneNumberCode.alpha2;

      const input: string = `+${internalNumber}${phoneNumberString}`;
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(input, alpha2);
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
      if (validNumber) {
        return;
      } else {
        return {phoneNumberInvalid: true};
      }
    } catch (e) {

    }
    return {phoneNumberInvalid: true};
  };
}
