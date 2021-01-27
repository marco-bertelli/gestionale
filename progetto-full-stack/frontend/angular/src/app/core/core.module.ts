import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpcomminicationsService } from './http-communication/httpcomminications.service';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[

  ],
  providers:[HttpcomminicationsService]
})
export class CoreModule { }
