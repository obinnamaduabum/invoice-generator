import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {LoginComponent} from '../../authentication/login/login.component';
import {LoginComponentHandlerService} from '../../../services/login-component-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private myToastService: MyToastService, private loginComponentHandlerService: LoginComponentHandlerService) { }

  ngOnInit(): void {}

  openLoginDialog(): void {
   this.loginComponentHandlerService.openDialog();
  }
}
