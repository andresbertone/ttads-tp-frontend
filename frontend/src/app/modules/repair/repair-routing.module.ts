import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepairsComponent } from './components/repairs/repairs.component';
import { RepairDetailComponent } from './components/repair-detail/repair-detail.component';
import { NewRepairComponent } from './components/new-repair/new-repair.component';


const routes: Routes = [
  {
    path: '',
    component: RepairsComponent,
    data: {
      role: ['all']
    }
  },
  {
    path: 'new-repair',
    component: NewRepairComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-repair/:repairId',
    component: NewRepairComponent,
    data: {
      role: ['all']
    }
  },
  {
    path: 'detail/:repairId',
    component: RepairDetailComponent,
    data: {
      role: ['all']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }
