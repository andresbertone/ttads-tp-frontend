import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './components/customers/customers.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    data: {
      role: ['all']
    }
  },
  {
    path: 'new-customer',
    component: NewCustomerComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'edit-customer/:customerId',
    component: NewCustomerComponent,
    data: {
      role: ['admin']
    }
  },
  {
    path: 'detail/:customerId',
    component: CustomerDetailComponent,
    data: {
      role: ['all']
    }
  },
  {
    path: ':customerId/vehicle',
    loadChildren: () => import('../vehicle/vehicle.module').then((module) => module.VehicleModule),
    data: {
      role: ['all']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
