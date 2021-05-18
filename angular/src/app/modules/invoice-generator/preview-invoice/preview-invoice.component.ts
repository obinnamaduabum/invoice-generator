import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {InvoiceInfoFormInterface} from "../../../interfaces/invoice-info-form-interface";
import {PdfGeneratorService} from "../../pdf-generator/services/pdf-generator.service";

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PreviewInvoiceComponent implements OnInit {

  table: string;
  dataTwo: string;
  dataOne: string;
  invoiceInfo: any;

  @Input('inputData') inputData: InvoiceInfoFormInterface;
  constructor(private pdfGeneratorService: PdfGeneratorService) { }

  ngOnInit(): void {
    const data = this.inputData;
    const columns: any[] = data['columns'];
    const rows: any[] = data['rows'];
    const company: any = data['company'];
    const client: any = data['client'];
    const invoiceInfo: any = {
      date: data['date'],
      dueDate: data['dueDate'],
      invoiceNumber: data['invoiceNumber']
    };
    this.invoiceInfo = invoiceInfo;

    this.table = this.pdfGeneratorService.getTableHtml(rows, columns);
    const {dataTwo, dataOne} = this.pdfGeneratorService.getCompanyAndClient(company, client, invoiceInfo);

    this.dataOne = dataOne;
    this.dataTwo = dataTwo;
  }

}
