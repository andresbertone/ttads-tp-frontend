import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { VehicleModule } from '../vehicle/vehicle.module';

import { CustomersComponent } from './components/customers/customers.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    CustomersComponent,
    NewCustomerComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    VehicleModule
  ]
})
export class CustomerModule { }
