import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {

  @Input('vehicles') vehicles!: MatTableDataSource<VehicleModel>;
  @Output() deleteVehicleEvent = new EventEmitter<VehicleModel>(); 

  displayedColumns: string[] = ['Make', 'Model', 'Year', 'LicensePlate', 'Action'];

  customerId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.customerId = this.activatedRoute.snapshot.paramMap.get('customerId') as string;
  }


  newVehicle() {
    this.router.navigateByUrl(`home/customers/${this.customerId}/vehicle/new-vehicle`);
  }

  editVehicle(vehicle: VehicleModel) {
    this.router.navigateByUrl(`home/customers/${this.customerId}/vehicle/edit-vehicle/${vehicle.vehicleId}`);
  }

  deleteVehicle(vehicle: VehicleModel) {
    this.deleteVehicleEvent.emit(vehicle);
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
