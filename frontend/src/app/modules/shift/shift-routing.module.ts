import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftsComponent } from './components/shifts/shifts.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
