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

  getRepairs(): Observable<RepairsModel> {
    return this.httpService.httpGetAll(this.baseUrl);
  }

  getRepairById(repairId: string): Observable<RepairModel> {
    return this.httpService.httpGet(`${this.baseUrl}/${repairId}`);
  }
}
