import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MechanicsComponent } from './components/mechanics/mechanics.component';
import { NewMechanicComponent } from './components/new-mechanic/new-mechanic.component';

const routes: Routes = [
  {
    path: '',
    component: MechanicsComponent
  },
  {
    path: 'new-mechanic',
    component: NewMechanicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicRoutingModule { }
