import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {

  @Input('vehicles') vehicles!: MatTableDataSource<VehicleModel>;

  displayedColumns: string[] = ['Make', 'Model', 'Year', 'LicensePlate', 'Action'];


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
