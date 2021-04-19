import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadGalleryComponent} from "../../file-upload/components/file-upload-gallery/file-upload-gallery.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  companyProfile: FormGroup;
  logoUrl: string;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog) {

    this.companyProfile = this.fb.group({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      websiteUrl: new FormControl('', []),
      phoneNumber: this.fb.array([]),
    });
  }

  ngOnInit(): void {

  }


  openAddLogoDialog(): void {
    const dialogRef = this.dialog.open(FileUploadGalleryComponent, {
      id: 'logo-upload-dialog',
      height: '90%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === "string") {
        console.log(result);
        this.logoUrl = result;
      }
    });
  }

  save() {

  }
}
