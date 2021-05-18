import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadGalleryComponent} from "../../file-upload/components/file-upload-gallery/file-upload-gallery.component";
import {MatDialog} from "@angular/material/dialog";
import {AddPhoneNumberComponent} from "../add-phone-number/add-phone-number.component";
import {CompanyProfileService} from "../../../services/company-profile-service/company-profile.service";
import {ResponseModel} from "../../../models/response-model";
import {MyToastService} from "../../../services/toast-service/my-toast.service";
import {MyEmailValidator} from "../../edit-phone-number-dialogue/validator/email_validator";
import {MyErrorStateMatcher} from "../../../utils/error_state_matcher";
import {MyUtils} from "../../../utils/my_utils";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  companyProfile: FormGroup;
  logoUrl: string;
  phoneNumbers: string[] = [];
  matcher = new MyErrorStateMatcher();
  makingRequest = false;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private myToastService: MyToastService,
              private companyProfileService: CompanyProfileService) {

    this.companyProfile = this.fb.group({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, MyEmailValidator]),
      logoUrl: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      websiteUrl: new FormControl('', []),
      phoneNumber: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {}


  openAddLogoDialog(): void {
    this.companyProfile.get('logoUrl').markAsTouched();
    const dialogRef = this.dialog.open(FileUploadGalleryComponent, {
      id: 'logo-upload-dialog',
      height: '90%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === "string") {
        this.logoUrl = result;
        this.companyProfile.get('logoUrl').setValue(result);
      }
    });
  }

  openAddPhoneNumberDialog() {

    this.companyProfile.get('phoneNumber').markAsTouched();
    const value = this.companyProfile.get('phoneNumber').value;
    const dialogRef = this.dialog.open(AddPhoneNumberComponent, {
      id: 'add-phone-number-dialog',
      height: '300px',
      width: '500px',
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      if(typeof result === "string") {
        this.phoneNumbers.push(result);
        if(value) {
          const array: any[] = [];

          if(result) {
            if (typeof value === "string") {
              array.push(value);
            } else {
              for (let i = 0; i < value.length; i++) {
                array.push(value[i]);
              }
            }
          }
          array.push(result);
          this.companyProfile.get('phoneNumber').setValue(array);
        } else {
          this.companyProfile.get('phoneNumber').setValue([result]);
        }
      }
    });
  }

  save() {
    if(this.companyProfile.valid) {
      this.makingRequest = true;
      const inputObj = this.companyProfile.getRawValue();
      this.companyProfileService.create(inputObj).subscribe((data: ResponseModel) => {
        this.makingRequest = false;
        if (data.success) {
          this.myToastService.showSuccess(data.message);
        } else {
          this.myToastService.showFailed(data.message);
        }
      }, error => {
        this.makingRequest = false;
        this.myToastService.showServerError();
      });
    } else {
      MyUtils.validateAllFormFields(this.companyProfile);
      this.myToastService.showInvalidFormError();
    }
  }
}
