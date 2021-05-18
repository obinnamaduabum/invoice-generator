import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhoneNumberDialogComponent} from './component/phone-number-dialog/edit-phone-number-dialogue-component';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {PhoneNumberCodeService} from "./service/phone_number_code.service";
import {TruncatePipe} from "../../pipe/truncate";

@NgModule({
  declarations: [
    //components
    PhoneNumberDialogComponent,
    //pipes
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
  ],
  providers: [PhoneNumberCodeService],
  entryComponents: [PhoneNumberDialogComponent],
  exports: [PhoneNumberDialogComponent]
})
export class PhoneNumberDialogueModule { }
