import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthenticationModule} from "../authentication/authentication.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    AuthenticationModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class HeaderFooterModule { }
