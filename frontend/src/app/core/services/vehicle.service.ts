import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { VehicleModel } from '../models/vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  readonly baseUrl: string = environment.baseUrl + '/vehicle';

  constructor(private httpService: HttpService) { }

  newVehicle(vehicleData: any): Observable<VehicleModel> {
    return this.httpService.httpPost(this.baseUrl, vehicleData);
  }

  deleteVehicle(vehicleId: number): Observable<VehicleModel> {
    return this.httpService.httpDelete(`${this.baseUrl}/${vehicleId}`);
  }
}
