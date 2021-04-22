import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-all-clients',
  templateUrl: './view-all-clients.component.html',
  styleUrls: ['./view-all-clients.component.css']
})
export class ViewAllClientsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoRoute(url: string) {
    this.router.navigateByUrl(url).then((result) => {
      console.log(result);
    });
  }
}
