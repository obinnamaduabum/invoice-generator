import { Component, OnInit } from '@angular/core';
import {InvoiceTemplateService} from "../../../services/invoice-template-service/invoice-template.service";
import {ResponseModel} from "../../../models/response-model";
import {PaginationInterface} from "../../../interfaces/pagination_interface";
import {LoginNotifierService} from "../../../services/logged-notifier-service/login-notifier-service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listOfInvoiceTemplates: any[] = [];

  constructor(private invoiceTemplateService: InvoiceTemplateService,
              private loginNotifierService: LoginNotifierService) { }

  ngOnInit(): void {

    this.fetchData();

    this.invoiceTemplateService.getJustUpdated().subscribe((data: boolean) => {

      if(data === true) {
        this.fetchData();
        this.invoiceTemplateService.setJustUpdated(false);
      }

    }, error => {

    });


    this.loginNotifierService.getLoggedInStatus().subscribe((data: boolean) => {

      if(data) {
        this.fetchData();
      }

    }, error => {

    });

  }

  fetchData() {
    this.invoiceTemplateService.index().subscribe((data: ResponseModel) => {
      if(data.success) {
        const paginatedData: PaginationInterface = data.data;
        this.listOfInvoiceTemplates = paginatedData.data;
      }
    }, error => {

    });
  }

  select(index: number) {
    const data = this.listOfInvoiceTemplates[index];
    this.invoiceTemplateService.set(data);
  }

}
