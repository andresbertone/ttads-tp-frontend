import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { NewVehicleComponent } from './components/new-vehicle/new-vehicle.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    NewVehicleComponent,
    VehicleDetailComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    VehiclesComponent
  ]
})
export class VehicleModule { }
