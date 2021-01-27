import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticoliRoutingModule } from './articoli-routing.module';
import { ArticoliComponent } from './articoli.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ArticoliComponent],
  imports: [
    CommonModule,
    ArticoliRoutingModule,
    SharedModule
  ]
})
export class ArticoliModule { }
