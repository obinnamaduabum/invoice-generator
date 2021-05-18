import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { CompaniesComponent } from './companies/companies.component';
import { AddPhoneNumberComponent } from './add-phone-number/add-phone-number.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PhoneNumberDialogueModule} from "../edit-phone-number-dialogue/edit-phone-number-dialogue.module";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  { path: 'create-profile', component: CompanyProfileComponent },
  { path: '', component: CompaniesComponent },
];

@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompaniesComponent,
    AddPhoneNumberComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PhoneNumberDialogueModule,
    MatIconModule
  ],
  exports: [
    CompaniesComponent
  ],
})
export class CompanyModule { }
