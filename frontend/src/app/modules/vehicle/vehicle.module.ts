import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { MaterialModule } from '../../material.module';

import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { NewVehicleComponent } from './components/new-vehicle/new-vehicle.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    NewVehicleComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    VehiclesComponent
  ]
})
export class VehicleModule { }
