import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from "rxjs";

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-protect-invoice-builder',
  templateUrl: './protect-invoice-builder.component.html',
  styleUrls: ['./protect-invoice-builder.component.css']
})
export class ProtectInvoiceBuilderComponent implements OnInit {

  asyncTabs: Observable<ExampleTab[]>;
  selectedPage = 0;
  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Invoice Creator', content: 'Content 1'},
          {label: 'Company', content: 'Content 2'},
          {label: 'Clients', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {}

  onNavigationChange($event: number) {
    this.selectedPage = $event;
  }

  gotoPage($event: number): void {
    // console.log($event);
    this.selectedPage = $event;
  }
}
