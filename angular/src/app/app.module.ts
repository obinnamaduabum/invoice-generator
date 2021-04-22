import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidebarService} from './services/sidebar-service/sidebar.service';
import {MyToastService} from './services/toast-service/my-toast.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ErrorCatcherService} from './services/error-catcher.service';
import {AuthenticationService} from './services/authentication-service';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {AlreadyLoggedInGuard} from './guard/already-logged-in/already-logged-in.guard';
import {UserLoggedInGuard} from './guard/user/user-logged-in.guard';
import {LogoService} from './services/logo.service';
import {CompanyProfileService} from "./services/company-profile.service";
import {DatePipe} from "@angular/common";
import {ClientService} from "./services/client.service";

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
    // guards
    AlreadyLoggedInGuard,
    UserLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
