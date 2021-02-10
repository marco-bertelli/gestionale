import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdiniRoutingModule } from './ordini-routing.module';
import { OrdiniComponent } from './ordini.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OrdiniComponent],
  imports: [
    CommonModule,
    OrdiniRoutingModule,
    SharedModule
  ]
})
export class OrdiniModule { }
