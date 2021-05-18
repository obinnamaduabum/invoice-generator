import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PhoneNumberCodes} from "../../model/phone-number-codes-model";
import {PhoneNumberCodeService} from "../../service/phone_number_code.service";

interface DialogData {
  name: string;
}

@Component({
  selector: 'app-phone-number-dialog',
  templateUrl: 'app-phone-number-dialog.html',
  styleUrls: ['./app-phone-number-dialog.css']
})
export class PhoneNumberDialogComponent implements OnInit {

  phoneNumberCodes: PhoneNumberCodes[] = [];
  listPhoneNumberCodes: PhoneNumberCodes[] = [];
  imagePath = '../assets/country/svg/';
  imageExtension = '.svg';

  constructor(public dialogRef: MatDialogRef<PhoneNumberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private phoneNumberCodeService: PhoneNumberCodeService) {}


  ngOnInit() {
    this.getPhoneNumberCodes();
  }
  getPhoneNumberCodes() {
    this.phoneNumberCodeService.getListOfPhoneCodes().subscribe(data => {

      console.log(data);

      this.listPhoneNumberCodes = data;
      this.phoneNumberCodes = this.listPhoneNumberCodes;
    }, error1 => {});
  }


  getLocalCountryImageUrl(b: string) {
    return this.imagePath + b.toLocaleLowerCase() + this.imageExtension;
  }


  findCountries(countryName: string) {
    this.listPhoneNumberCodes = this.phoneNumberCodes.filter(restaurant =>
      restaurant.name.toLowerCase().includes(countryName.toLocaleLowerCase()));
  }

}
