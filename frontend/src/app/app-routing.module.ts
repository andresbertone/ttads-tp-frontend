import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((module) => module.HomeModule),
    canActivate: [AuthGuard],
    data: {
      role: ['all']
    }
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
