import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { 
        path: 'customers',
        loadChildren: () => import('../customer/customer.module').then((module) => module.CustomerModule)
      },
      { 
        path: 'mechanics',
        loadChildren: () => import('../mechanic/mechanic.module').then((module) => module.MechanicModule)
      },
      { 
        path: 'shifts',
        loadChildren: () => import('../shift/shift.module').then((module) => module.ShiftModule)
      },
      { 
        path: 'spare-parts',
        loadChildren: () => import('../spare-part/spare-part.module').then((module) => module.SparePartModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
