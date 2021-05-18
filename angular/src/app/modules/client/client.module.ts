import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewAllClientsComponent } from './view-all-clients/view-all-clients.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {RouterModule, Routes} from "@angular/router";
import {MatTableModule} from "@angular/material/table";

const routes: Routes = [
  { path: 'create-profile', component: AddClientComponent },
  { path: '', component: ViewAllClientsComponent },
];

@NgModule({
  declarations: [
    AddClientComponent,
    ViewAllClientsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    SharedModuleModule,
    MatTableModule
  ], exports: [
    ViewAllClientsComponent
  ]
})
export class ClientModule { }
