import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidebarService} from './services/sidebar-service/sidebar.service';
import {MyToastService} from './services/toast-service/my-toast.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorCatcherService} from './services/error-service/error-catcher.service';
import {AuthenticationService} from './services/authentication-service/authentication-service';
import {UserService} from './services/user-service/user.service';
import {HttpClientModule} from '@angular/common/http';
import {AlreadyLoggedInGuard} from './guards/already-logged-in/already-logged-in.guard';
import {UserLoggedInGuard} from './guards/user/user-logged-in.guard';
import {LogoService} from './services/logo-service/logo.service';
import {CompanyProfileService} from "./services/company-profile-service/company-profile.service";
import {DatePipe} from "@angular/common";
import {ClientService} from "./services/client-service/client.service";
import {PhoneNumberCodeService} from "./modules/edit-phone-number-dialogue/service/phone_number_code.service";
import {InvoiceTemplateService} from "./services/invoice-template-service/invoice-template.service";
import {LoginNotifierService} from "./services/logged-notifier-service/login-notifier-service";
import {HamburgerNotifierService} from "./services/hamburger-notifier-service/hamburger-notifier-service";
import {DownloadService} from "./services/download-service";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        ToastrModule.forRoot({
          positionClass : 'toast-top-right'
        }),
      HttpClientModule
    ],
  providers: [
    DatePipe,
    SidebarService,
    MyToastService,
    ToastrService,
    ErrorCatcherService,
    AuthenticationService,
    UserService,
    LogoService,
    CompanyProfileService,
    ClientService,
    PhoneNumberCodeService,
    InvoiceTemplateService,
    LoginNotifierService,
    HamburgerNotifierService,
    DownloadService,
    //truncate

    // guards
    AlreadyLoggedInGuard,
    UserLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
