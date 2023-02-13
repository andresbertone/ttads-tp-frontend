import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparePartRoutingModule } from './spare-part-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SparePartsComponent } from './components/spare-parts/spare-parts.component';
import { NewSparePartComponent } from './components/new-spare-part/new-spare-part.component';
import { SparePartDetailComponent } from './components/spare-part-detail/spare-part-detail.component';


@NgModule({
  declarations: [
    SparePartsComponent,
    NewSparePartComponent,
    SparePartDetailComponent
  ],
  imports: [
    CommonModule,
    SparePartRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SparePartModule { }
