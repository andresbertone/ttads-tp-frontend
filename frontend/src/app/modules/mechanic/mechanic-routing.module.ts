import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MechanicsComponent } from './components/mechanics/mechanics.component';
import { NewMechanicComponent } from './components/new-mechanic/new-mechanic.component';
import { MechanicDetailComponent } from './components/mechanic-detail/mechanic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MechanicsComponent
  },
  {
    path: 'new-mechanic',
    component: NewMechanicComponent
  },
  {
    path: 'edit-mechanic/:mechanicId',
    component: NewMechanicComponent
  },
  {
    path: 'detail/:mechanicId',
    component: MechanicDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicRoutingModule { }
