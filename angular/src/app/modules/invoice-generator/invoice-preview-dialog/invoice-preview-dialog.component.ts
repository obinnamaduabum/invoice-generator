import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyToastService} from "../../../services/toast-service/my-toast.service";
import {InvoiceInfoFormInterface} from "../../../interfaces/invoice-info-form-interface";

@Component({
  selector: 'app-invoice-preview-dialog',
  templateUrl: './invoice-preview-dialog.component.html',
  styleUrls: ['./invoice-preview-dialog.component.css'],
})
export class InvoicePreviewDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<InvoicePreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InvoiceInfoFormInterface) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
