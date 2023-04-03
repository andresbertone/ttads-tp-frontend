import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MechanicsComponent } from './components/mechanics/mechanics.component';
import { NewMechanicComponent } from './components/new-mechanic/new-mechanic.component';
import { MechanicDetailComponent } from './components/mechanic-detail/mechanic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MechanicsComponent,
    data: {
      role: ['all']
    }
  },
  {
    path: 'new-mechanic',
    component: NewMechanicComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-mechanic/:mechanicId',
    component: NewMechanicComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'detail/:mechanicId',
    component: MechanicDetailComponent,
    data: {
      role: ['all']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicRoutingModule { }
