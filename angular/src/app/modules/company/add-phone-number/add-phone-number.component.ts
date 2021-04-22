import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MyToastService } from "../../../services/toast-service/my-toast.service";
import { PhoneNumberCodeService } from "../../edit-phone-number-dialogue/service/phone_number_code.service";
import { PhoneNumberDialogComponent } from "../../edit-phone-number-dialogue/component/phone-number-dialog/edit-phone-number-dialogue-component";
import { MyErrorStateMatcher } from "../../../utils/error_state_matcher";
import { PhoneNumberValidator } from "../../edit-phone-number-dialogue/validator/phone-validator";
import {PhoneNumberCodes} from "../../edit-phone-number-dialogue/model/phone-number-codes-model";
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit {

  phoneNumberForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  imagePath = '../assets/country/svg/';
  imageExtension = '.svg';
  loadingPageData = false;
  phoneNumberCodesList: PhoneNumberCodes[];

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private myToastService: MyToastService,
              private phoneNumberCodeService: PhoneNumberCodeService) {

    this.phoneNumberForm = this.fb.group({
      selectedPhoneNumber: ['', []],
      phoneNumber: ['', [Validators.required, PhoneNumberValidator('phoneNumber')]],
    });
  }

  ngOnInit(): void {
    this.getPhoneNumberCodes();
  }

  getPhoneNumberCodes(): void {
    this.loadingPageData = true;
    this.phoneNumberCodeService.getListOfPhoneCodes().subscribe(data => {
      this.phoneNumberCodesList = data;
      const array = this.phoneNumberCodesList.filter(value =>
        value.alpha2.toLowerCase().includes('ng')
      );

      for (let i = 0; i < array.length; i++) {
        if (i < 1) {
          this.phoneNumberForm.get('selectedPhoneNumber').setValue(array[i]);
        }
      }
      this.loadingPageData = false;
    }, error2 => {
    });
  }

  save() {
    if(this.phoneNumberForm.valid) {
      const myDialog = this.dialog.getDialogById('add-phone-number-dialog');
      this.myToastService.showSuccess('Phone number added');
      const phoneNumber: string = this.phoneNumberForm.get('phoneNumber').value;
      const selectedPhoneNumber = this.phoneNumberForm.get('selectedPhoneNumber').value;
      const phoneNumberUtil = PhoneNumberUtil.getInstance();
      const alpha2: string = selectedPhoneNumber.alpha2;
      console.log(alpha2);
      //const PNF = PhoneNumberFormat;
      //const result = phoneNumberUtil.format(phoneNumber, PNF.INTERNATIONAL);

      const d = phoneNumberUtil.formatOutOfCountryCallingNumber(phoneNumber, alpha2);
      console.log(d);
      //myDialog.close();
    } else {
      this.myToastService.showFailed('Form invalid');
    }
  }

  openPhoneNumberDialog(phoneNumber: string, selectedPhoneNumber: string) {
    if (this.phoneNumberForm.get(phoneNumber).value) {

    } else {
      this.phoneNumberForm.get(phoneNumber).setErrors(null);
    }

    const dialogRef = this.dialog.open(PhoneNumberDialogComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {
        this.phoneNumberForm.get(selectedPhoneNumber).setValue(result);
        if (this.phoneNumberForm.get(phoneNumber).value) {
          this.phoneNumberForm.get(phoneNumber).updateValueAndValidity();
        }
      }
    });
  }

  getLocalCountryImageUrl(b: string) {
    if(b){
      return this.imagePath + b.toLocaleLowerCase() + this.imageExtension;
    }
   return;
  }
}
