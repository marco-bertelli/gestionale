import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';


import { RouterModule } from '@angular/router';

import { TableSortComponent } from './table-sort/table-sort.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateProdFormComponent } from './update-prod-form/update-prod-form.component';
import { TableComponent } from './table/table.component';
import { InsertFormComponent } from './insert-form/insert-form.component';
import { UpdateFattureFormComponent } from './update-fatture-form/update-fatture-form.component';
import { FatturaBodyComponent } from './fattura-body/fattura-body.component';
import { UpdateFattureCodaComponent } from './update-fatture-coda/update-fatture-coda.component';
@NgModule({
  declarations: [TableSortComponent, UpdateProdFormComponent, TableComponent, InsertFormComponent, UpdateFattureFormComponent, FatturaBodyComponent, UpdateFattureCodaComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  exports:[
    MDBBootstrapModulesPro,
    RouterModule,
    CommonModule,
    TableSortComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    InsertFormComponent,
    UpdateFattureFormComponent,
    FatturaBodyComponent,
    UpdateFattureCodaComponent
    
  ]
})
export class SharedModule { }
