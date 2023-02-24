import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { ShiftsModel } from '../models/shift/shifts.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  readonly baseUrl: string = environment.baseUrl + '/shift';

  constructor(private httpService: HttpService) { }

  searchShifts(options = {}): Observable<ShiftsModel> {
    return this.httpService.httpGetAll(`${this.baseUrl}/searchShifts`, options);
  }
}
