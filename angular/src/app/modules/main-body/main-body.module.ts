import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule, Routes} from '@angular/router';
import {HeaderFooterModule} from '../header-footer/header-footer.module';
import {SidebarModule} from '../sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '', component: BodyComponent, children: [
      { path: '', redirectTo: '/invoice-builder', pathMatch: 'full' },
      { path: 'invoice-builder',
        loadChildren : () => import('../invoice-generator/invoice-generator.module').then(m => m.InvoiceGeneratorModule) }
    ]
  }
];

@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderFooterModule,
    SidebarModule,
    RouterModule.forChild(routes)
  ]
})
export class MainBodyModule { }
