import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicRoutingModule } from './mechanic-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { MechanicsComponent } from './components/mechanics/mechanics.component';

@NgModule({
  declarations: [
    MechanicsComponent
  ],
  imports: [
    CommonModule,
    MechanicRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MechanicModule { }
