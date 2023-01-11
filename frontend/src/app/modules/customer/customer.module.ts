import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModule } from '../../material.module';

import { CustomersComponent } from './components/customers/customers.component';
import { NoRecordsMessageComponent } from 'src/app/core/components/no-records-message/no-records-message.component';

import { CustomerService } from './../../core/services/customer.service';

@NgModule({
  declarations: [
    CustomersComponent,
    NoRecordsMessageComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
