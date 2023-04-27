import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { VehicleModel } from '../models/vehicle/vehicle.model';
import { VehiclesModel } from '../models/vehicle/vehicles.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  readonly baseUrl: string = environment.baseUrl + '/vehicle';

  constructor(private httpService: HttpService) { }

  getVehicleById(vehicleId: string, options = {}): Observable<VehicleModel> {
    return this.httpService.httpGet(`${this.baseUrl}/${vehicleId}`, options);
  }

  getVehiclesFromCustomer(customerId: number): Observable<VehiclesModel> {
    return this.httpService.httpGetAll(`${this.baseUrl}/vehiclesFromCustomer/${customerId}`);
  }

  newVehicle(vehicleData: any): Observable<VehicleModel> {
    return this.httpService.httpPost(this.baseUrl, vehicleData);
  }

  editVehicle(vehicleData: any, vehicleId: string): Observable<VehicleModel> {
    return this.httpService.httpPut(`${this.baseUrl}/${vehicleId}`, vehicleData);
  }

  deleteVehicle(vehicleId: string): Observable<VehicleModel> {
    return this.httpService.httpDelete(`${this.baseUrl}/${vehicleId}`);
  }
}
