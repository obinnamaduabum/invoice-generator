import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './component/pdf-generator.component';
import {PdfGeneratorService} from "./services/pdf-generator.service";

@NgModule({
  declarations: [
    PdfGeneratorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PdfGeneratorService]
})
export class PdfGeneratorModule { }
