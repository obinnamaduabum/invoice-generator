import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    SidebarComponent
  ],
    imports: [
        CommonModule,
        MatCardModule
    ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
