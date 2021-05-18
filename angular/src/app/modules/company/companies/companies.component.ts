import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {CompanyProfileService} from "../../../services/company-profile-service/company-profile.service";
import {ResponseModel} from "../../../models/response-model";
import {CompanyProfileApiResponseInterface} from "../../../interfaces/company-profile-api-response-interface";
import {PaginationInterface} from "../../../interfaces/pagination_interface";
import {rejects} from "assert";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../../../assets/css/shimmer.css', './companies.component.css']
})
export class CompaniesComponent implements OnInit {

  listOfCompanyProfiles: CompanyProfileApiResponseInterface[] = [];
  @Output() gotoEvent = new EventEmitter<number>();

  constructor(private router: Router,
              private companyProfileService: CompanyProfileService) { }

  createPlaceholderArray() {
    const obj: CompanyProfileApiResponseInterface = {
      address: "",
      city: "",
      date_created: "",
      date_updated: "",
      email: "",
      id: 0,
      logoUrl: "",
      name: null,
      state: "",
      street: "",
      user_id: 0,
      websiteUrl: "",
      zipCode: "",
      loaded: false
    };
    const array: any[] = [];
    for(let i =0; i < 10; i++){
      array.push(obj);
    }
    return array;
  }

  ngOnInit(): void {

    this.listOfCompanyProfiles = this.createPlaceholderArray();
    this.companyProfileService.index(0, 10).subscribe((data: ResponseModel) => {

      if(data.success) {
        const paginationObj: PaginationInterface = data.data;
        this.listOfCompanyProfiles = paginationObj.data;
      }
    }, error => {})
  }

  async loadImage($event: any, index: number) {
   return new Promise((resolve, reject) => {
     if($event) {
       resolve($event);
     }
    }).then((value) => {
     this.listOfCompanyProfiles[index].loaded = true;
    }).catch((e) => {
      rejects(e);
   });


  }

  addCompanyProfile(url: string) {
    this.router.navigateByUrl(url).then((result) => {
      console.log(result);
    });
  }

  selectCompany(input: any) {
    this.companyProfileService.setCompanyProfile(input);
    //this.gotoEvent.emit(0);
    this.router.navigateByUrl('/invoice-builder/main/create');
  }
}
