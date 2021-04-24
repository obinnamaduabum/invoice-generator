import {Component, Inject, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.css']
})
export class PreviewInvoiceComponent implements OnInit {

  @Input('inputData') inputData;
  constructor() { }

  ngOnInit(): void {
    console.log(this.inputData);
  }

}
