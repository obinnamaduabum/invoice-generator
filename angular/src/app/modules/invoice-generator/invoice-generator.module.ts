import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InvoiceCreatorComponent,
  InvoiceCreatorDialogComponent
} from './invoice-creator/invoice-creator.component';
import {RouterModule, Routes} from '@angular/router';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FileUploadModule} from '../file-upload/file-upload.module';
import { UserLoggedInGuard } from 'src/app/guard/user/user-logged-in.guard';
import { AlreadyLoggedInGuard } from 'src/app/guard/already-logged-in/already-logged-in.guard';
import { ProtectInvoiceBuilderComponent } from './protect-invoice-builder/protect-invoice-builder.component';

const routes: Routes = [
  { path: '', component: InvoiceCreatorComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'main', component: ProtectInvoiceBuilderComponent, canActivate: [UserLoggedInGuard] }
];

@NgModule({
  declarations: [
    InvoiceCreatorComponent,
    InvoiceCreatorDialogComponent,
    ProtectInvoiceBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FileUploadModule
  ]
})
export class InvoiceGeneratorModule { }
