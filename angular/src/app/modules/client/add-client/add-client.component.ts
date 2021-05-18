import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../utils/error_state_matcher";
import {MatDialog} from "@angular/material/dialog";
import {MyToastService} from "../../../services/toast-service/my-toast.service";
import {CompanyProfileService} from "../../../services/company-profile-service/company-profile.service";
import {MyEmailValidator} from "../../edit-phone-number-dialogue/validator/email_validator";
import {PhoneNumberDialogComponent} from "../../edit-phone-number-dialogue/component/phone-number-dialog/edit-phone-number-dialogue-component";
import {PhoneNumberCodeService} from "../../edit-phone-number-dialogue/service/phone_number_code.service";
import {ClientService} from "../../../services/client-service/client.service";
import {ResponseModel} from "../../../models/response-model";
import {MyUtils} from "../../../utils/my_utils";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientInfoForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  makingRequest = false;
  imagePath = '../assets/country/svg/';
  imageExtension = '.svg';
  loadingPageData = false;
  phoneNumberCodesList: any[] = [];


  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private myToastService: MyToastService,
              private companyProfileService: CompanyProfileService,
              private phoneNumberCodeService: PhoneNumberCodeService,
              private clientService: ClientService) {

    this.clientInfoForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, MyEmailValidator]),
      address: new FormControl('', [Validators.required]),
      selectedPhoneNumber: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
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
          this.clientInfoForm.get('selectedPhoneNumber').setValue(array[i]);
        }
      }
      this.loadingPageData = false;
    }, error2 => {
    });
  }

  openPhoneNumberDialog(phoneNumber: string, selectedPhoneNumber: string) {
    if (this.clientInfoForm.get(phoneNumber).value) {

    } else {
      this.clientInfoForm.get(phoneNumber).setErrors(null);
    }

    const dialogRef = this.dialog.open(PhoneNumberDialogComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {
        this.clientInfoForm.get(selectedPhoneNumber).setValue(result);
        if (this.clientInfoForm.get(phoneNumber).value) {
          this.clientInfoForm.get(phoneNumber).updateValueAndValidity();
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

  save() {

    if(this.clientInfoForm.valid) {
      this.makingRequest = true;

      const phoneNumber: string = this.clientInfoForm.get('phoneNumber').value;
      const selectedPhoneNumber = this.clientInfoForm.get('selectedPhoneNumber').value;
      const phoneNumberString = MyUtils.getPhoneNumberInternationNumber(phoneNumber, selectedPhoneNumber);

      const raw = this.clientInfoForm.getRawValue();
      const inputObject = Object.assign(raw, {phoneNumber: phoneNumberString});

      this.clientService.create(inputObject).subscribe((data: ResponseModel) => {
        this.makingRequest = false;
        if(data.success) {
          this.myToastService.showSuccess(data.message);
        } else {
          this.myToastService.showFailed(data.message);
        }

      }, error => {
        this.makingRequest = false;
        this.myToastService.showServerError();
      })
    } else {
      MyUtils.validateAllFormFields(this.clientInfoForm);
      this.myToastService.showFailed("Kindly fill required fields");
    }
  }
}
