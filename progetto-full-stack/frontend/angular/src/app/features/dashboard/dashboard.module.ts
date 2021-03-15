import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { DropdownModule, MDBSpinningPreloader } from 'ng-uikit-pro-standard';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    MDBBootstrapModulesPro.forRoot(),
    DropdownModule.forRoot(),
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [MDBSpinningPreloader],
})
export class DashboardModule { }
