import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { ShiftsModel } from '../models/shift/shifts.model';
import { ShiftModel } from '../models/shift/shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  readonly baseUrl: string = environment.baseUrl + '/shift';

  constructor(private httpService: HttpService) { }

  searchShifts(options = {}): Observable<ShiftsModel> {
    return this.httpService.httpGetAll(`${this.baseUrl}/searchShifts`, options);
  }

  newShift(data: any): Observable<ShiftModel> {
    return this.httpService.httpPost(this.baseUrl, data);
  }

  cancelShift(shiftId: number): Observable<ShiftModel> {
    return this.httpService.httpPut(`${this.baseUrl}/cancel/${shiftId}`);
  }
}
