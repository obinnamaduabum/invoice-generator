import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-protect-invoice-builder',
  templateUrl: './protect-invoice-builder.component.html',
  styleUrls: ['./protect-invoice-builder.component.css']
})
export class ProtectInvoiceBuilderComponent implements OnInit {


  constructor(public router: Router) {
    // this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
    //   setTimeout(() => {
    //     observer.next([
    //       {label: 'Invoice Creator', link: '/invoice-builder/company'},
    //       {label: 'Company', link: '/invoice-builder/company'},
    //       {label: 'Clients', link: '/invoice-builder/client'},
    //     ]);
    //   }, 1000);
    // });
  }

  ngOnInit(): void {}

}
