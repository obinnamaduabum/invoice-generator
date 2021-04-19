import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../../../assets/css/shimmer.css', './companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addCompanyProfile(url: string) {
    this.router.navigateByUrl(url).then((result) => {
      console.log(result);
    })
  }
}
