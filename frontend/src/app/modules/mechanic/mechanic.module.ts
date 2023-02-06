import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicRoutingModule } from './mechanic-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MechanicsComponent } from './components/mechanics/mechanics.component';
import { NewMechanicComponent } from './components/new-mechanic/new-mechanic.component';

@NgModule({
  declarations: [
    MechanicsComponent,
    NewMechanicComponent
  ],
  imports: [
    CommonModule,
    MechanicRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MechanicModule { }
