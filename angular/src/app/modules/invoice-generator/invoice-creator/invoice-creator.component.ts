import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {PageSize} from '../../../interfaces/page-size-interface';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {EnumInputType} from '../../../lh-enum/EnumInputType';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginComponentHandlerService} from '../../../services/login-component-handler.service';
import {CompanyProfileService} from "../../../services/company-profile.service";
import {CompanyProfileInterface} from "../../../../../../backend/src/interface/company_profile_interface";
import {DatePipe} from "@angular/common";
import {Subscription} from "rxjs";
import { Output, EventEmitter } from '@angular/core';
import {ClientService} from "../../../services/client.service";
import {MyUtils} from "../../../utils/my_utils";
import {InvoiceCreatorDialogComponent} from "./add-column/add-column-component";

export interface InvoiceCreationInterface {
  thList: ThTypeInterface[];
  tbList: ThTypeInterface[];
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


@Component({
  selector: 'app-invoice-creator',
  templateUrl: './invoice-creator.component.html',
  styleUrls: ['./invoice-creator.component.css', './add-column/add-column-component.css']
})
export class InvoiceCreatorComponent implements OnInit, OnDestroy {

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
  logoUrl: string = "";
  selectedCompany: CompanyProfileInterface = null;
  selectedClient: any = null;
  date: string;
  loginComponentHandlerServiceSubscription: Subscription;
  @Output() gotoEvent = new EventEmitter<number>();
  //create
  invoiceInfoForm: FormGroup;
  clientAndCompanyForm: FormGroup;
  dateNow: Date = new Date();

  constructor(public dialog: MatDialog,
              private myToastService: MyToastService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private loginComponentHandlerService: LoginComponentHandlerService,
              private companyProfileService: CompanyProfileService,
              private router: Router,
              public datePipe: DatePipe,
              private clientService: ClientService) {



    //Form 1
    this.invoiceInfoForm = this.fb.group({
      date: new FormControl(this.dateNow, [Validators.required]),
      dueDate: new FormControl(this.dateNow, [Validators.required]),
      invoiceNumber: new FormControl('', [Validators.required])
    });

    //Form 2
    this.clientAndCompanyForm = this.fb.group({
      company: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
    });

    //Form 3
    this.invoiceForm = this.fb.group({
      name: '',
      rows: this.fb.array([]),
    });

    this.route.queryParams.subscribe(params => {
      if (params.login === 'true') {
        this.loginComponentHandlerService.setDialogState(true);
        this.loginComponentHandlerService.openDialog();
      }
    });
  }

  ngOnInit(): void {

    this.clientService.getSelectedClient().subscribe((data: any) => {
      if(data){
        this.clientAndCompanyForm.get('client').setValue(data);
        this.selectedClient = data;
      }
    }, error => {

    });

    this.companyProfileService.getCompanyProfile().subscribe((data: any) => {
      if(data){
        this.clientAndCompanyForm.get('company').setValue(data);
        this.selectedCompany = data;
      }
    }, error => {

    });

    this.defaultPageSize = this.pageSizes[3];
    this.reCalibrate(this.defaultPageSize.name);
    this.invoiceCreationObj = {
      thList: [],
      tbList: []
    };

    this.loginComponentHandlerServiceSubscription = this.loginComponentHandlerService.loginDialogObservable.subscribe(value => {
      if (value) {
        this.loginComponentHandlerService.openDialog();
      }
    });

  }

  ngOnDestroy(): void {
    this.loginComponentHandlerServiceSubscription.unsubscribe();
  }

  public get EnumInputType(): any {
    return EnumInputType;
  }

  get rows(): FormArray {
    return this.invoiceForm.get('rows') as FormArray;
  }

  calculateTotal(): void {
    const listOfRows = this.rows.value;
   // console.log(listOfRows);
    for (const amount of listOfRows) {
     // console.log(amount);
      this.totalAmount += amount;
    }
  }

  newColumn(listOfTh: any[]): FormGroup {
    const obj = {};
    for (const key of listOfTh) {
      obj[key.value] = ['', Validators.required];
    }
    //console.log(obj);
    return this.fb.group(obj);
  }

  rowBuilder(listOfTh: any[], rowIndex: number): void {
    this.rows.push(this.newColumn(listOfTh));
  }

  addRow(): void {
   // console.log(this.invoiceCreationObj.thList);
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
    if (object) {
      return 'success' in object;
    }
    return false;
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

     // console.log('scale: ' + scale);
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

  // percentageChange(x: number, originalAmount: number): number {
  //   const divisionResult = x / originalAmount;
  //   console.log('divisionResult: ' + divisionResult);
  //
  //   // 'transform': 'translate(-50%, -50%)' + 'scale('+scale+')'
  //   return  divisionResult * 100;
  // }

  gotoUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  myGotoEvent(value: number) {
    this.gotoEvent.emit(value);
  }

  addClient(s: string) {
    this.clientAndCompanyForm.get('client').markAsTouched();
    this.gotoUrl(s);
  }

  addCompany(s: string) {
    this.clientAndCompanyForm.get('company').markAsTouched();
    this.gotoUrl(s);
  }

  save(): void {
    console.log(this.invoiceForm.getRawValue());

    if(this.invoiceInfoForm.valid) {
      console.log(this.invoiceInfoForm.getRawValue());
    } else {
      MyUtils.validateAllFormFields(this.invoiceInfoForm);
      this.myToastService.showFailed("Kindly fill invoice form properly");
    }

    if(this.clientAndCompanyForm.valid) {
      console.log(this.clientAndCompanyForm.getRawValue());
    } else {
      MyUtils.validateAllFormFields(this.clientAndCompanyForm);
    }

    if(!this.selectedClient && !this.selectedCompany) {
      this.myToastService.showFailed("Kindly add client and company");
    } else if(!this.selectedClient) {
      this.myToastService.showFailed("Kindly add client");
    } else if(!this.selectedCompany) {
      this.myToastService.showFailed("Kindly add company");
    }

  }
}
