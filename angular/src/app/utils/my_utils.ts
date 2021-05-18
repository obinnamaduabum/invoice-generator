import {FormControl, FormGroup} from "@angular/forms";
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import {PageSize} from "../interfaces/page-size-interface";

export const pageSizes: PageSize[] = [
  { height: 3508, width: 2480, name: 'A4'},
  { height: 4961, width: 3508, name: 'A3'},
  { height: 7016, width: 4961, name: 'A2'},
  { height: 9933, width: 7016, name: 'A1'},
  { height: 14043, width: 9933, name: 'A0'},
];
export const listOfCurrencies: any[] = [
  { name: 'Dollar', symbol: '&#36;'},
  { name: 'Pound Sterling',
    symbol: '&#163;' },
  { name: 'Yen', symbol: '&#165;'},
  { name: 'Euro', symbol: '&#128;'},
  { name: 'Rupee', symbol: '&#x20B9;'},
  { name: 'Naira', symbol: '&#8358;'}
];

export class MyUtils {
  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  static getPhoneNumberInternationNumber(phoneNumber: string, selectedPhoneNumber: any) {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const alpha2: string = selectedPhoneNumber.alpha2;

    const number = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, alpha2);
    const countryCode: number = number.getCountryCode();
    const nationalPhoneNumber: number = number.getNationalNumber();

    const phoneNumberString: string = `${countryCode}${nationalPhoneNumber}`;
    return phoneNumberString;
  }


  static generateRandomString(length) {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

}
