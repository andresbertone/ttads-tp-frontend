import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepairsComponent } from './components/repairs/repairs.component';


const routes: Routes = [
  {
    path: '',
    component: RepairsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }
