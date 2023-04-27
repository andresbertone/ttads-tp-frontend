import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ShortcutsComponent } from './components/shortcuts/shortcuts.component';

import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      { 
        path: '',
        component: ShortcutsComponent,
        data: {
          role: ['all']
        }
      },
      { 
        path: 'customers',
        loadChildren: () => import('../customer/customer.module').then((module) => module.CustomerModule),
        data: {
          role: ['all']
        }
      },
      { 
        path: 'mechanics',
        loadChildren: () => import('../mechanic/mechanic.module').then((module) => module.MechanicModule),
        data: {
          role: ['all']
        }
      },
      { 
        path: 'repairs',
        loadChildren: () => import('../repair/repair.module').then((module) => module.RepairModule),
        data: {
          role: ['all']
        }
      },
      { 
        path: 'shifts',
        loadChildren: () => import('../shift/shift.module').then((module) => module.ShiftModule),
        data: {
          role: ['admin']
        }
      },
      { 
        path: 'spare-parts',
        loadChildren: () => import('../spare-part/spare-part.module').then((module) => module.SparePartModule),
        data: {
          role: ['all']
        }
      },
    ]
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
