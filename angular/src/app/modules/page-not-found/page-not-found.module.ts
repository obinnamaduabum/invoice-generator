import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatCardModule} from "@angular/material/card";
import {MyLottieModule} from "../lottie/lottie.module";
import {RouterModule, Routes} from "@angular/router";
import {HeaderFooterModule} from "../header-footer/header-footer.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidebarModule} from "../sidebar/sidebar.module";

const routes: Routes = [
  { path: '', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MyLottieModule,
    RouterModule.forChild(routes),
    HeaderFooterModule,
    MatSidenavModule,
    SidebarModule,
  ]
})
export class PageNotFoundModule { }
