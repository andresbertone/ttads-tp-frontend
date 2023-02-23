import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShiftRoutingModule } from './shift-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';

import { ShiftsComponent } from './components/shifts/shifts.component';

@NgModule({
  declarations: [
    ShiftsComponent
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ShiftModule { }
