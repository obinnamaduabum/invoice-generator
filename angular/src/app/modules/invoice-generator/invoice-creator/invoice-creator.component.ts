import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {PageSize} from '../../../interfaces/page-size-interface';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {EnumInputType} from '../../../lh-enum/EnumInputType';
import {FileUploadGalleryComponent} from '../../file-upload/components/file-upload-gallery/file-upload-gallery.component';
import {ActivatedRoute} from '@angular/router';
import {LoginComponentHandlerService} from '../../../services/login-component-handler.service';
import {LogoService} from '../../../services/logo.service';
import {ResponseModel} from '../../../models/response-model';

export interface InvoiceCreationInterface {
  thList: ThTypeInterface[];
  tbList: ThTypeInterface[];
}

@Component({
  selector: 'app-invoice-creator',
  templateUrl: './invoice-creator.component.html',
  styleUrls: ['./invoice-creator.component.css', './add-column-component.css']
})
export class InvoiceCreatorComponent implements OnInit {

  pageSize: PageSize;
  defaultPageSize: PageSize;
  currentWidth = window.innerWidth;
  currentHeight = window.innerHeight;
  scale: number;
  invoiceCreationObj: InvoiceCreationInterface;
  invoiceForm: FormGroup;
  totalAmount = 0;
  openLoginDialog = false;
  pageSizes: PageSize[] = [
    { height: 3508, width: 2480, name: 'A4'},
    { height: 4961, width: 3508, name: 'A3'},
    { height: 7016, width: 4961, name: 'A2'},
    { height: 9933, width: 7016, name: 'A1'},
    { height: 14043, width: 9933, name: 'A0'},
  ];
  listOfCurrencies: any[] = [
    { name: 'Dollar', symbol: '&#36;'},
    { name: 'Pound Sterling',
      symbol: '&#163;' },
    { name: 'Yen', symbol: '&#165;'},
    { name: 'Euro', symbol: '&#128;'},
    { name: 'Rupee', symbol: '&#x20B9;'},
    { name: 'Naira', symbol: '&#8358;'}
    ];

  constructor(public dialog: MatDialog,
              private myToastService: MyToastService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private loginComponentHandlerService: LoginComponentHandlerService) {

    this.invoiceForm = this.fb.group({
      name: '',
      rows: this.fb.array([])
    });

    this.route.queryParams.subscribe(params => {
      if (params.login === 'true') {
        console.log('run...');
        this.loginComponentHandlerService.setDialogState(true);
        this.loginComponentHandlerService.openDialog();
      }
    });
  }


  ngOnInit(): void {
    this.defaultPageSize = this.pageSizes[3];
    this.reCalibrate(this.defaultPageSize.name);
    this.invoiceCreationObj = {
      thList: [],
      tbList: []
    };

    this.loginComponentHandlerService.loginDialogObservable.subscribe(value => {
      if (value) {
        this.loginComponentHandlerService.openDialog();
      }
    });

  }


  public get EnumInputType(): any {
    return EnumInputType;
  }

  get rows(): FormArray {
    return this.invoiceForm.get('rows') as FormArray;
  }

  calculateTotal(): void {
    const listOfRows = this.rows.value;
    console.log(listOfRows);
    for (const amount of listOfRows) {
      console.log(amount);
      this.totalAmount += amount;
    }
  }

  newColumn(listOfTh: any[]): FormGroup {
    const obj = {};
    for (const key of listOfTh) {
      obj[key.value] = ['', Validators.required];
    }
    console.log(obj);
    return this.fb.group(obj);
  }

  rowBuilder(listOfTh: any[], rowIndex: number): void {
    this.rows.push(this.newColumn(listOfTh));
  }

  addRow(): void {
    console.log(this.invoiceCreationObj.thList);
    this.rowBuilder(this.invoiceCreationObj.thList, 0);
    // this.invoiceCreationObj.tbList.push({value: '', type: ''});
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  openAddColumnDialog(): void {
    const dialogRef = this.dialog.open(InvoiceCreatorDialogComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.instanceOfResponseDialog(result)) {
        if (result.success) {
          this.invoiceCreationObj.thList = result.result;
          this.myToastService.showSuccess(result.message);
        } else {
          this.myToastService.showFailed(result.message);
        }
      } else {
        this.myToastService.showFailed('Error occurred');
      }
    });
  }

  instanceOfResponseDialog(object: any): object is ResponseDialog {
    return 'success' in object;
  }

  updatePageSize($event: any): void {
    const value: string = $event.value;
    this.reCalibrate(value);
  }

  reCalibrate(value: string): void {

    const index = this.pageSizes.findIndex((el, idx) => el.name.toLowerCase() === value.toLowerCase());
    const foundPageSize: PageSize = this.pageSizes[index];

    let newHeight = 0;
    let newWidth = 0;

    if (foundPageSize.width > this.currentWidth) {

      const scale = Math.min(
        this.currentWidth / foundPageSize.width,
       this.currentHeight / foundPageSize.height
      );

      console.log('scale: ' + scale);
      this.scale = scale;

      newWidth = foundPageSize.width;
      newHeight = foundPageSize.height;

    }

    const newPageSize: PageSize = {height: newHeight, width: newWidth, name: foundPageSize.name};
    this.setUpPage(newPageSize);
  }

  setUpPage(pageSize: PageSize): void {
    this.pageSize = pageSize;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.currentWidth = event.target.innerWidth;
    this.reCalibrate(this.pageSize.name);
  }

  percentageChange(x: number, originalAmount: number): number {
    const divisionResult = x / originalAmount;
    console.log('divisionResult: ' + divisionResult);

    // 'transform': 'translate(-50%, -50%)' + 'scale('+scale+')'
    return  divisionResult * 100;
  }

  save(): void {
    console.log(this.invoiceForm.getRawValue());
  }

  openAddLogoDialog(): void {
    const dialogRef = this.dialog.open(FileUploadGalleryComponent, {
      height: '90%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.instanceOfResponseDialog(result)) {
        if (result.success) {
          this.invoiceCreationObj.thList = result.result;
          this.myToastService.showSuccess(result.message);
        } else {
          this.myToastService.showFailed(result.message);
        }
      } else {
        this.myToastService.showFailed('Error occurred');
      }
    });
  }
}

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
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private myToastService: MyToastService,
              private logoService: LogoService) {}

  ngOnInit(): void {
    this.addColumnForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      typeOfColumn: new FormControl('', [Validators.required]),
    });

    this.logoService.index().subscribe((data: ResponseModel) => {
      console.log(data);
    }, error => {
    });
  }

  checkIfExist(name: string): boolean {
    const foundIndex = this.thList.findIndex(data => data.value.toLowerCase() === name.toLowerCase());
    console.log(foundIndex);
    return foundIndex <= -1;
  }

  addColumn(): void {
    if (this.addColumnForm.valid) {
      const value = this.addColumnForm.get('name').value;
      if (this.checkIfExist(value)) {
        const type = this.addColumnForm.get('typeOfColumn').value;
        const obj: ThTypeInterface = {value, type};
        console.log(obj);
        this.thList.push(obj);
      } else {
        this.myToastService.showFailed('Column Name already exists');
      }
    } else {
      this.myToastService.showFailed('Form invalid');
    }

  }

  removeFromColumn(index: number): void {
    console.log(index);
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

export interface DialogData {
  name: string;
}

export interface ThTypeInterface {
  value: string;
  type: string;
}

export interface ResponseDialog {
  result: any;
  success: boolean;
  message: string;
}
