import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './components/customers/customers.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'new-customer',
    component: NewCustomerComponent
  },
  {
    path: 'edit-customer/:customerId',
    component: NewCustomerComponent
  },
  {
    path: 'detail/:customerId',
    component: CustomerDetailComponent
  },
  {
    path: ':customerId/vehicle',
    loadChildren: () => import('../vehicle/vehicle.module').then((module) => module.VehicleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
