import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnumInputType} from "../../../lh-enum/EnumInputType";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyToastService} from "../../../services/toast-service/my-toast.service";
import {LogoService} from "../../../services/logo-service/logo.service";
import {ResponseDialog} from "../../../interfaces/response_dialog";
import {ThTypeInterface} from "../../../interfaces/thtype-interface";

@Component({
  selector: 'app-add-column-component',
  templateUrl: 'add-column-component.html',
  styleUrls: ['./add-column-component.css']
})
export class InvoiceCreatorDialogComponent implements OnInit {

  thList: any[] = [];
  addColumnForm: FormGroup;
  inputTypeList: string[] = [EnumInputType.AMOUNT, EnumInputType.STRING, EnumInputType.DISCOUNT];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<InvoiceCreatorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private myToastService: MyToastService,
              private logoService: LogoService) {}

  ngOnInit(): void {
    this.addColumnForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      typeOfColumn: new FormControl('', [Validators.required]),
    });

  }

  checkIfExist(name: string): boolean {
    const foundIndex = this.thList.findIndex(data => data.value.toLowerCase() === name.toLowerCase());
    return foundIndex <= -1;
  }

  addColumn(): void {
    if (this.addColumnForm.valid) {
      const value = this.addColumnForm.get('name').value;
      if (this.checkIfExist(value)) {
        const type = this.addColumnForm.get('typeOfColumn').value;
        const obj: ThTypeInterface = {value, type};
        this.thList.push(obj);
      } else {
        this.myToastService.showFailed('Column Name already exists');
      }
    } else {
      this.myToastService.showFailed('Form invalid');
    }

  }

  removeFromColumn(index: number): void {
    if (index > -1) {
      this.thList.splice(index, 1);
    }
  }

  save(): void {
    if (this.thList.length > 0) {

      const obj: ResponseDialog = {
        result: this.thList,
        success: true,
        message: 'Column name added'
      };

      this.dialogRef.close(obj);
    } else {
      this.myToastService.showFailed('Column name required');
    }
  }
}


