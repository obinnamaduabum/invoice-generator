import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadGalleryComponent} from "../../file-upload/components/file-upload-gallery/file-upload-gallery.component";
import {MatDialog} from "@angular/material/dialog";
import {AddPhoneNumberComponent} from "../add-phone-number/add-phone-number.component";
import {CompanyProfileService} from "../../../services/company-profile.service";
import {ResponseModel} from "../../../models/response-model";
import {MyToastService} from "../../../services/toast-service/my-toast.service";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  companyProfile: FormGroup;
  logoUrl: string;
  phoneNumbers: string[] = [];

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
      email: new FormControl('', [Validators.required]),
      logoUrl: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      websiteUrl: new FormControl('', []),
      phoneNumber: this.fb.array(this.phoneNumbers || [])
    });
  }

  ngOnInit(): void {

  }


  openAddLogoDialog(): void {
    this.companyProfile.get('logoUrl').markAsTouched();
    const dialogRef = this.dialog.open(FileUploadGalleryComponent, {
      id: 'logo-upload-dialog',
      height: '90%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === "string") {
        // console.log(result);
        this.logoUrl = result;
        this.companyProfile.get('logoUrl').setValue(result);
      }
    });
  }

  save() {
    if(this.companyProfile.valid) {
      const inputObj = this.companyProfile.getRawValue();
      this.companyProfileService.create(inputObj).subscribe((data: ResponseModel) => {
        if (data.success) {
          this.myToastService.showSuccess(data.message);
        } else {
          this.myToastService.showFailed(data.message);
        }
      }, error => {
        this.myToastService.showServerError();
      });
    } else {
      this.myToastService.showInvalidFormError();
    }
  }

  openAddPhoneNumberDialog() {

    this.companyProfile.get('phoneNumber').markAsTouched();
    const dialogRef = this.dialog.open(AddPhoneNumberComponent, {
      id: 'add-phone-number-dialog',
      height: '300px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(typeof result === "string") {
        this.phoneNumbers.push(result);
      }
    });
  }
}
