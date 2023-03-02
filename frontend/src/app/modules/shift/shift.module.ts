import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShiftRoutingModule } from './shift-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';

import { ShiftsComponent } from './components/shifts/shifts.component';
import { SearchShiftComponent } from './components/search-shift/search-shift.component';
import { NewShiftComponent } from './components/new-shift/new-shift.component';

@NgModule({
  declarations: [
    ShiftsComponent,
    SearchShiftComponent,
    NewShiftComponent
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShiftModule { }
