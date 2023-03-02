import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftsComponent } from './components/shifts/shifts.component';
import { NewShiftComponent } from './components/new-shift/new-shift.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftsComponent
  },
  {
    path: 'new-shift',
    component: NewShiftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
