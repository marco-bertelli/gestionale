import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'articoli', loadChildren: () => import('./features/articoli/articoli.module').then(m => m.ArticoliModule) },
  { path: 'clienti', loadChildren: () => import('./features/clienti/clienti.module').then(m => m.ClientiModule) },
  { path: 'ordini', loadChildren: () => import('./features/ordini/ordini.module').then(m => m.OrdiniModule) },
  { path: 'fatture', loadChildren: () => import('./features/fatture/fatture.module').then(m => m.FattureModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'page-not-found', loadChildren: () => import('./features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  { path: '**',   redirectTo: '/page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
