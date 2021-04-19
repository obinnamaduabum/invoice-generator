import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MyToastService} from "../../../services/toast-service/my-toast.service";

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit {

  phoneNumberForm: FormGroup;
  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private myToastService: MyToastService) {

    this.phoneNumberForm = this.fb.group({
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  save() {
    if(this.phoneNumberForm.valid) {
      const myDialog = this.dialog.getDialogById('add-phone-number-dialog');
      this.myToastService.showSuccess('Phone number added');
      myDialog.close(this.phoneNumberForm.get('phoneNumber').value);
    } else {
      this.myToastService.showFailed('Form invalid');
    }
  }
}
