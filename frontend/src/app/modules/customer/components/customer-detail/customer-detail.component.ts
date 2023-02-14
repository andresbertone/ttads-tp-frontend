import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerService } from 'src/app/core/services/customer.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';

import { CustomerModel } from 'src/app/core/models/customer/customer.model';
import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerId!: string;
  customer!: CustomerModel
  vehicles!: MatTableDataSource<VehicleModel>;

  displayedColumns: string[] = ['Make', 'Model', 'Year', 'LicensePlate'];

  constructor(
    private customerService: CustomerService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('customerId') as string;
    if (!this.customerId) return;

    this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.getCustomerById(this.customerId, { includeVehicles: true })
      .subscribe((customer: CustomerModel) => {
        this.customer = customer;
        this.vehicles = new MatTableDataSource(this.customer.vehicles);
      });
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  editCustomer() {
    this.router.navigateByUrl(`home/customers/edit-customer/${this.customerId}`);
  }

  goBack() {
    this.router.navigateByUrl('home/customers');
  }

  getAccordionDescription() {
    if (this.vehicles.data.length === 0) {
      return 'There are no vehicles';
    } else if (this.vehicles.data.length === 1) {
      return `There is ${this.vehicles.data.length} vehicle`;
    } else {
      return `There are ${this.vehicles.data.length} vehicles`;
    }
  }
}
