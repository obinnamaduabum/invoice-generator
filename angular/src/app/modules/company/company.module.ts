import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import {RouterModule, Routes} from "@angular/router";
import {AlreadyLoggedInGuard} from "../../guard/already-logged-in/already-logged-in.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [
  { path: 'create-profile', component: CompanyProfileComponent },
  { path: '', component: CompaniesComponent },
];

@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompaniesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CompanyModule { }
