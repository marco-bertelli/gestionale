import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientiRoutingModule } from './clienti-routing.module';
import { ClientiComponent } from './clienti.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ClientiComponent],
  imports: [
    CommonModule,
    ClientiRoutingModule,
    SharedModule
  ]
})
export class ClientiModule { }
