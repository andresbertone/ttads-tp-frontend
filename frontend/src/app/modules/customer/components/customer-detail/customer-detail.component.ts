import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerService } from 'src/app/core/services/customer.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

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

  constructor(
    private customerService: CustomerService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private dialogService: DialogService,
    private alertService: AlertService
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

  deleteVehicle(vehicle: VehicleModel) {
    this.dialogService.showWarning(
      'Delete vehicle',
      [this.dialogService.getDialogWarningMessage(vehicle, 'vehicle', 'delete')],
      'No',
      'Delete',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.deleteVehicle(vehicle.vehicleId).subscribe(
          (vehicle: VehicleModel) => {
            this.alertService.openSnackBar(`The vehicle ${vehicle.make} ${vehicle.model} was successfully deleted.`);
            this.loadCustomer();
          }
        );
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('home/customers');
  }
}
