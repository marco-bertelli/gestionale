import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticoliComponent } from './articoli.component';

const routes: Routes = [{ path: '', component: ArticoliComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticoliRoutingModule { }
