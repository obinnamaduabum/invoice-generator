import { Component, OnInit } from '@angular/core';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {LoginComponentHandlerService} from '../../../services/login-component-service/login-component-handler.service';
import {AuthenticationService} from '../../../services/authentication-service/authentication-service';
import {MyRoutes} from "../../../utils/my-routes";
import {Router} from "@angular/router";
import {HamburgerNotifierService} from "../../../services/hamburger-notifier-service/hamburger-notifier-service";
import {SidebarService} from "../../../services/sidebar-service/sidebar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './hamburger.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  loggingOut = false;
  hamburgerState = false;
  constructor(private myToastService: MyToastService,
              private authenticationService: AuthenticationService,
              private loginComponentHandlerService: LoginComponentHandlerService,
              private hamburgerNotifierService: HamburgerNotifierService,
              private sidebarService: SidebarService,
              private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((data: any) => {
      if (data) {
        this.isLoggedIn = true;
      }
    });

    this.hamburgerNotifierService.getHamburgerStatus().subscribe((data: boolean) => {
      this.hamburgerState = data;
    }, (error => {

    }));
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

  toggleHamburger() {
    this.hamburgerNotifierService.setToggle(!this.hamburgerState);
    if(this.hamburgerState) {
      this.sidebarService.open();
    } else {
      this.sidebarService.close();
    }

  }
}
