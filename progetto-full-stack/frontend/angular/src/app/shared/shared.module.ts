import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { TableSortComponent } from './table-sort/table-sort.component';

@NgModule({
  declarations: [TableSortComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    RouterModule
    
  ],
  exports:[
    MDBBootstrapModulesPro,
    RouterModule,
    CommonModule,
    TableSortComponent
    
  ]
})
export class SharedModule { }
