import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";
import {InvoiceTemplateService} from "../../../services/invoice-template-service/invoice-template.service";
import {ResponseInvoiceTemplateInterface} from "../../../interfaces/invoice-template-interface";

@Component({
  selector: 'app-protect-invoice-builder',
  templateUrl: './protect-invoice-builder.component.html',
  styleUrls: ['./protect-invoice-builder.component.css']
})
export class ProtectInvoiceBuilderComponent implements OnInit {


  responseInvoiceTemplate: ResponseInvoiceTemplateInterface;
  constructor(public router: Router) {


  }

  ngOnInit(): void {}

}
