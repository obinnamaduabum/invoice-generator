import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

export interface ExampleTab {
  label: string;
  link: string;
}

@Component({
  selector: 'app-invoice-navigation-body',
  templateUrl: './invoice-navigation-body.component.html',
  styleUrls: ['./invoice-navigation-body.component.css']
})
export class InvoiceNavigationBodyComponent implements OnInit {

  asyncTabs: Observable<ExampleTab[]>;
  rootUrl = '/invoice-builder/main';
  navLinks: any[] = [
    {label: 'Invoice Creator', link: '/create'},
    {label: 'Company', link: '/company'},
    {label: 'Clients', link: '/client'}];
  selectedPage = 0;

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

  onNavigationChange($event: number) {
    this.selectedPage = $event;
  }

  gotoPage($event: number): void {
    console.log("mmmmmm: "+$event);
    this.selectedPage = $event;
  }

}
