import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {LoginComponent} from '../../authentication/login/login.component';
import {LoginComponentHandlerService} from '../../../services/login-component-handler.service';
import {AuthenticationService} from '../../../services/authentication-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  constructor(private myToastService: MyToastService,
              private authenticationService: AuthenticationService,
              private loginComponentHandlerService: LoginComponentHandlerService) { }

  ngOnInit(): void {
    this.authenticationService.fetchUser().subscribe((data: any) => {
      if (data) {
        this.isLoggedIn = true;
      }
    });
  }

  openLoginDialog(): void {
   this.loginComponentHandlerService.openDialog();
  }
}
