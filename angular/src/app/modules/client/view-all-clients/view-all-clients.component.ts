import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MyToastService} from "../../../services/toast-service/my-toast.service";
import {CompanyProfileService} from "../../../services/company-profile-service/company-profile.service";
import {PhoneNumberCodeService} from "../../edit-phone-number-dialogue/service/phone_number_code.service";
import {ClientService} from "../../../services/client-service/client.service";
import {ResponseModel} from "../../../models/response-model";
import {PaginationInterface} from "../../../interfaces/pagination_interface";


export interface PeriodicElement {
  address: string;
  date_created: number;
  date_updated: number;
  email: string;
  name: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-view-all-clients',
  templateUrl: './view-all-clients.component.html',
  styleUrls: ['./view-all-clients.component.css']
})
export class ViewAllClientsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'address',
    'email', 'phoneNumber', 'dateCreated',
    'dateUpdated', 'select'];
  dataSource = [];
  @Output() gotoEventTwo = new EventEmitter<number>()

  constructor(private router: Router,
              private myToastService: MyToastService,
              private companyProfileService: CompanyProfileService,
              private phoneNumberCodeService: PhoneNumberCodeService,
              private clientService: ClientService) { }

  ngOnInit(): void {
    this.getIndex();
  }

  getIndex() {
    this.clientService.index().subscribe((data: ResponseModel) => {

      if(data.success){
        const paginatedResult: PaginationInterface = data.data
        this.dataSource = paginatedResult.data;
      }

    }, error => {});
  }

  gotoRoute(url: string) {
    this.router.navigateByUrl(url).then((result) => {
      console.log(result);
    });
  }

  selectClient(input: any) {
    this.clientService.setSelectedClient(input);
    this.gotoRoute('/invoice-builder/main/create')
    //this.gotoEventTwo.emit(0);
  }
}
