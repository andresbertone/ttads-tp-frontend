import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

import { CustomersComponent } from './components/customers/customers.component';

@NgModule({
  declarations: [
    CustomersComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CustomerModule { }
