import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { MechanicsModel } from '../models/mechanic/mechanics.model';
import { MechanicModel } from '../models/mechanic/mechanic.model';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  readonly baseUrl: string = environment.baseUrl + '/mechanic';

  constructor(private httpService: HttpService) { }

  getMechanics(): Observable<MechanicsModel> {
    return this.httpService.httpGetAll(this.baseUrl);
  }

  getMechanicById(mechanicId: string): Observable<MechanicModel> {
    return this.httpService.httpGet(`${this.baseUrl}/${mechanicId}`);
  }

  newMechanic(mechanicData: any): Observable<MechanicModel> {
    return this.httpService.httpPost(this.baseUrl, mechanicData);
  }

  editMechanic(mechanicData: any, mechanicId: string): Observable<MechanicModel> {
    return this.httpService.httpPut(`${this.baseUrl}/${mechanicId}`, mechanicData);
  }

  deleteMechanic(mechanicId: number): Observable<MechanicModel> {
    return this.httpService.httpDelete(`${this.baseUrl}/${mechanicId}`);
  }
}
