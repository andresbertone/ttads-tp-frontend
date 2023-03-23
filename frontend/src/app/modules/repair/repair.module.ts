import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairRoutingModule } from './repair-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { RepairsComponent } from './components/repairs/repairs.component';
import { RepairDetailComponent } from './components/repair-detail/repair-detail.component';


@NgModule({
  declarations: [
    RepairsComponent,
    RepairDetailComponent
  ],
  imports: [
    CommonModule,
    RepairRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class RepairModule { }
