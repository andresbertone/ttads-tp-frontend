import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { MaterialModule } from '../../material.module';

import { VehiclesComponent } from './components/vehicles/vehicles.component';


@NgModule({
  declarations: [
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MaterialModule
  ],
  exports: [
    VehiclesComponent
  ]
})
export class VehicleModule { }
