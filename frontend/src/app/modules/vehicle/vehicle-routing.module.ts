import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewVehicleComponent } from './components/new-vehicle/new-vehicle.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    path: 'new-vehicle',
    component: NewVehicleComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-vehicle/:vehicleId',
    component: NewVehicleComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'detail/:vehicleId',
    component: VehicleDetailComponent,
    data: {
      role: ['all']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
