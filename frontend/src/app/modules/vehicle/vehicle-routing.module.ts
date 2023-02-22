import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewVehicleComponent } from './components/new-vehicle/new-vehicle.component';

const routes: Routes = [
  {
    path: 'new-vehicle',
    component: NewVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
