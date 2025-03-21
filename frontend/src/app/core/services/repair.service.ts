import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { RepairsModel } from '../models/repair/repairs.model';
import { RepairModel } from '../models/repair/repair.model';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  readonly baseUrl: string = environment.baseUrl + '/repair';

  constructor(private httpService: HttpService) { }

  getRepairs(queryParams = {}): Observable<RepairsModel> {
    return this.httpService.httpGetAll(this.baseUrl, queryParams);
  }

  getRepairById(repairId: string): Observable<RepairModel> {
    return this.httpService.httpGet(`${this.baseUrl}/${repairId}`);
  }

  newRepair(repairData: any): Observable<RepairModel> {
    return this.httpService.httpPost(this.baseUrl, repairData);
  }

  editRepair(repairData: any, repairId: string): Observable<RepairModel> {
    return this.httpService.httpPut(`${this.baseUrl}/editRepair/${repairId}`, repairData);
  }

  takeRepair(repairId: number, mechanicId: number): Observable<RepairModel> {
    return this.httpService.httpPut(`${this.baseUrl}/assignMechanic/${repairId}/${mechanicId}`);
  }

  markRepairAsCompleted(repairId: number, mechanicId: number): Observable<RepairModel> {
    return this.httpService.httpPut(`${this.baseUrl}/markAsCompleted/${repairId}/${mechanicId}`);
  }

  markRepairAsDelivered(repairId: number): Observable<RepairModel> {
    return this.httpService.httpPut(`${this.baseUrl}/markAsDelivered/${repairId}`);
  }

  deleteRepair(repairId: number): Observable<RepairModel> {
    return this.httpService.httpDelete(`${this.baseUrl}/${repairId}`);
  }
}
