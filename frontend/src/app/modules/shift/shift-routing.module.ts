import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftsComponent } from './components/shifts/shifts.component';
import { NewShiftComponent } from './components/new-shift/new-shift.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftsComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'new-shift',
    component: NewShiftComponent,
    data: {
      role: ['admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
