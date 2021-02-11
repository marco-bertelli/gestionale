import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FattureRoutingModule } from './fatture-routing.module';
import { FattureComponent } from './fatture.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FattureComponent],
  imports: [
    CommonModule,
    FattureRoutingModule,
    SharedModule
  ]
})
export class FattureModule { }
