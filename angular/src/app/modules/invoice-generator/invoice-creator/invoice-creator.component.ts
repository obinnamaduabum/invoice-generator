import {Component, HostListener, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PageSize} from '../../../interfaces/page-size-interface';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {EnumInputType} from '../../../lh-enum/EnumInputType';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginComponentHandlerService} from '../../../services/login-component-service/login-component-handler.service';
import {CompanyProfileService} from "../../../services/company-profile-service/company-profile.service";
import {CompanyProfileInterface} from "../../../../../../backend/src/interface/company_profile_interface";
import {DatePipe} from "@angular/common";
import {Subscription} from "rxjs";
import { Output, EventEmitter } from '@angular/core';
import {ClientService} from "../../../services/client-service/client.service";
import {listOfCurrencies, MyUtils, pageSizes} from "../../../utils/my_utils";
import {InvoiceCreatorDialogComponent} from "../add-column/add-column-component";
import {InvoicePreviewDialogComponent} from "../invoice-preview-dialog/invoice-preview-dialog.component";
import {InvoiceInfoFormInterface} from "../../../interfaces/invoice-info-form-interface";
import {InvoiceCreationInterface} from "../../../interfaces/invoice_creation_interface";
import {ResponseDialog} from "../../../interfaces/response_dialog";
import {SaveTemplateDialogComponent} from "../save-template-dialog/save-template-dialog.component";
import {ResponseInvoiceTemplateInterface} from "../../../interfaces/invoice-template-interface";
import {InvoiceTemplateService} from "../../../services/invoice-template-service/invoice-template.service";
import {DownloadService} from "../../../services/download-service";
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-invoice-creator',
  templateUrl: './invoice-creator.component.html',
  styleUrls: ['./invoice-creator.component.css', '../add-column/add-column-component.css']
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
  pageSizes: PageSize[] = pageSizes;
  listOfCurrencies: any[] = listOfCurrencies;
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
  @Input() inputInvoiceTemplate: ResponseInvoiceTemplateInterface;
  responseInvoiceTemplate: ResponseInvoiceTemplateInterface;
  downloading = false;

  constructor(public dialog: MatDialog,
              private myToastService: MyToastService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private loginComponentHandlerService: LoginComponentHandlerService,
              private companyProfileService: CompanyProfileService,
              private router: Router,
              public datePipe: DatePipe,
              private clientService: ClientService,
              private invoiceTemplateService: InvoiceTemplateService,
              private downloadService: DownloadService) {

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

    this.invoiceInfoForm.patchValue({
      invoiceNumber: MyUtils.generateRandomString(9)
    });


    this.invoiceTemplateService.get().subscribe((data: any) => {

      if(data) {

        this.responseInvoiceTemplate = data;

        this.invoiceForm.patchValue({
          rows: this.responseInvoiceTemplate.rows
        });

        this.invoiceCreationObj = {
          thList: this.responseInvoiceTemplate.rows,
          tbList: []
        }

        this.clientAndCompanyForm.patchValue({
          company: this.responseInvoiceTemplate.companyProfile,
          client: this.responseInvoiceTemplate.client
        });

        this.selectedCompany = this.responseInvoiceTemplate.companyProfile;
        this.selectedClient = this.responseInvoiceTemplate.client;
      }

    }, error => {

    });

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
    for (const amount of listOfRows) {
      this.totalAmount += amount;
    }
  }

  newColumn(listOfTh: any[]): FormGroup {
    const obj = {};
    for (const key of listOfTh) {
      obj[key.value] = ['', Validators.required];
    }
    return this.fb.group(obj);
  }

  rowBuilder(listOfTh: any[], rowIndex: number): void {
    this.rows.push(this.newColumn(listOfTh));
  }

  addRow(): void {
    this.rowBuilder(this.invoiceCreationObj.thList, 0);
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

  saveTemplate(): void {
    const res: InvoiceInfoFormInterface = this.getDataToSave();
    if(res) {

      const input = {
        rows: res.columns,
        company_name: res.company['name'],
        client_email: res.client['email']
      };

      this.openSaveDialog(input);
    }
  }


  downloadPdf(): void {
    const res: InvoiceInfoFormInterface = this.getDataToSave();
    if(res) {

      const body = {
        client: res.client,
        company: res.company,
        columns: res.columns,
        rows: res.rows,
        invoiceObj: {
          date: res.date,
          dueDate: res.dueDate,
          invoiceNumber: res.invoiceNumber,
        }
      }

      this.downloading = true;
      let downloadName = 'download.pdf';
      this.downloadService.download(body).subscribe((blob)=> {
        this.downloading = false;
        if(blob) {
          saveAs(blob, downloadName);
        }
      }, error => {
        this.downloading = false;
      });


    }
  }


  getDataToSave() {

    if(this.invoiceInfoForm.valid) {
      // console.log(this.invoiceInfoForm.getRawValue());
    } else {
      MyUtils.validateAllFormFields(this.invoiceInfoForm);
      this.myToastService.showFailed("Kindly fill invoice form properly");
    }

    if(this.clientAndCompanyForm.valid) {
      // console.log(this.clientAndCompanyForm.getRawValue());
      // this.clientAndCompanyForm.get('client').hasError()
    } else {
      MyUtils.validateAllFormFields(this.clientAndCompanyForm);
    }

    if(this.invoiceInfoForm.valid && this.clientAndCompanyForm.valid && this.invoiceForm.valid) {

      const response: InvoiceInfoFormInterface = {
        client: this.clientAndCompanyForm.get('client').value,
        company: this.clientAndCompanyForm.get('company').value,
        date: this.invoiceInfoForm.get('date').value,
        dueDate: this.invoiceInfoForm.get('dueDate').value,
        invoiceNumber: this.invoiceInfoForm.get('invoiceNumber').value,
        columns: this.invoiceCreationObj.thList,
        rows: this.invoiceForm.get('rows').value
      }

      return response;
    }

    return null;

  }

  openSaveDialog(input: any): void {
      const dialogRef = this.dialog.open(SaveTemplateDialogComponent, {
        height: '250px',
        width: '400px',
        data: input
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (this.instanceOfResponseDialog(result)) {
        //   if (result.success) {
        //     this.invoiceCreationObj.thList = result.result;
        //     this.myToastService.showSuccess(result.message);
        //   } else {
        //     this.myToastService.showFailed(result.message);
        //   }
        // } else {
        //   this.myToastService.showFailed('Error occurred');
        // }
      });
  }

  openPreviewDialog(): void {

    const res: InvoiceInfoFormInterface = this.getDataToSave();
    if(res) {

      const dialogRef = this.dialog.open(InvoicePreviewDialogComponent, {
        height: '90%',
        width: '40%',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (this.instanceOfResponseDialog(result)) {
        //   if (result.success) {
        //     this.invoiceCreationObj.thList = result.result;
        //     this.myToastService.showSuccess(result.message);
        //   } else {
        //     this.myToastService.showFailed(result.message);
        //   }
        // } else {
        //   this.myToastService.showFailed('Error occurred');
        // }
      });
    } else {
      console.log("error");
    }
  }

  removeClient() {
    this.selectedClient = null;
  }

  removeCompany() {
    this.selectedCompany = null;
  }

  removeColumns() {
    this.invoiceCreationObj = {
      thList: [],
      tbList: []
    }
  }
}
