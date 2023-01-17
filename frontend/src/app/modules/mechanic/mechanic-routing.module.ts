import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MechanicsComponent } from './components/mechanics/mechanics.component';

const routes: Routes = [
  {
    path: '',
    component: MechanicsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicRoutingModule { }
