import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparePartRoutingModule } from './spare-part-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { SparePartsComponent } from './components/spare-parts/spare-parts.component';


@NgModule({
  declarations: [
    SparePartsComponent
  ],
  imports: [
    CommonModule,
    SparePartRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class SparePartModule { }
