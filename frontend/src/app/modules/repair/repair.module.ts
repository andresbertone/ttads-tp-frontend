import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RepairRoutingModule } from './repair-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { RepairsComponent } from './components/repairs/repairs.component';
import { RepairDetailComponent } from './components/repair-detail/repair-detail.component';
import { SearchRepairComponent } from './components/search-repair/search-repair.component';
import { NewRepairComponent } from './components/new-repair/new-repair.component';


@NgModule({
  declarations: [
    RepairsComponent,
    RepairDetailComponent,
    SearchRepairComponent,
    NewRepairComponent
  ],
  imports: [
    CommonModule,
    RepairRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RepairModule { }
