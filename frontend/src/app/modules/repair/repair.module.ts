import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairRoutingModule } from './repair-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { RepairsComponent } from './components/repairs/repairs.component';


@NgModule({
  declarations: [
    RepairsComponent
  ],
  imports: [
    CommonModule,
    RepairRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class RepairModule { }
