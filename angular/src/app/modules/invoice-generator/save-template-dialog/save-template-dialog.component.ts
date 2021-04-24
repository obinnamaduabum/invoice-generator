import {Component, Inject, OnInit} from '@angular/core';
import {ResponseModel} from "../../../models/response-model";
import {InvoiceTemplateService} from "../../../services/invoice-template-service/invoice-template.service";
import {MyToastService} from "../../../services/toast-service/my-toast.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-save-template-dialog',
  templateUrl: './save-template-dialog.component.html',
  styleUrls: ['./save-template-dialog.component.css']
})
export class SaveTemplateDialogComponent implements OnInit {

  invoiceTemplateForm: FormGroup;

  constructor(private invoiceTemplateService: InvoiceTemplateService,
              private myToastService: MyToastService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<SaveTemplateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {

    this.invoiceTemplateForm = this.fb.group({
      name: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {}

  save() {
    if(this.invoiceTemplateForm.valid) {
      const input: any = Object.assign(this.data, {name: this.invoiceTemplateForm.get('name').value });
      this.invoiceTemplateService.create(input).subscribe((data: ResponseModel) => {
        console.log(data);
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

}
