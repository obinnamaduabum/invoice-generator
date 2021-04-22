import { Component, OnInit } from '@angular/core';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {LoginComponentHandlerService} from '../../../services/login-component-handler.service';
import {AuthenticationService} from '../../../services/authentication-service';
import {MyRoutes} from "../../../utils/my-routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  loggingOut = false;
  constructor(private myToastService: MyToastService,
              private authenticationService: AuthenticationService,
              private loginComponentHandlerService: LoginComponentHandlerService,
              private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((data: any) => {
      if (data) {
        this.isLoggedIn = true;
      }
    });
  }

  openLoginDialog(): void {
   this.loginComponentHandlerService.openDialog();
  }

  doLogout() {
    this.loggingOut = true;
    this.authenticationService.logout().subscribe((data: Response) => {
      this.loggingOut = false;
      if(data) {
        this.authenticationService.clearStaleSession();
        this.router.navigate([MyRoutes.notProtected.loginPage]);
      }

    }, error => {

      this.loggingOut = false;

    });
  }

  gotoUrl(url: string) {
    this.router.navigateByUrl(url).then((result) => {
    });
  }
}
