import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';
import { TableSortComponent } from './table-sort/table-sort.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateProdFormComponent } from './update-prod-form/update-prod-form.component';
import { TableComponent } from './table/table.component';
import { InsertFormComponent } from './insert-form/insert-form.component';
import { UpdateClientFormComponent } from './update-client-form/update-client-form.component';
import { UpdateOrdineFormComponent } from './update-ordine-form/update-ordine-form.component';
@NgModule({
  declarations: [TableSortComponent, UpdateProdFormComponent, TableComponent, InsertFormComponent, UpdateClientFormComponent, UpdateOrdineFormComponent],
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
    InsertFormComponent

  ]
})
export class SharedModule { }
