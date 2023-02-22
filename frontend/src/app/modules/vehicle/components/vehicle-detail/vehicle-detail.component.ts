import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService } from 'src/app/core/services/vehicle.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';

import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  customerId!: string;
  vehicleId!: string;
  vehicle!: VehicleModel

  constructor(
    private vehicleService: VehicleService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vehicleId = this.activatedRoute.snapshot.paramMap.get('vehicleId') as string;
    this.customerId = this.activatedRoute.snapshot.paramMap.get('customerId') as string;
    if (!this.vehicleId) return;

    this.loadVehicle();
  }

  loadVehicle() {
    this.vehicleService.getVehicleById(this.vehicleId)
      .subscribe((vehicle: VehicleModel) => {
        this.vehicle = vehicle;
      });
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  editVehicle() {
    this.router.navigateByUrl(`home/customers/${this.customerId}/vehicle/edit-vehicle/${this.vehicleId}`);
  }

  goBack() {
    this.router.navigateByUrl(`home/customers/detail/${this.customerId}`);
  }
}
