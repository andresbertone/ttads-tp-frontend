import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { MechanicsModel } from './../models/mechanic/mechanics.model';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  readonly baseUrl: string = environment.baseUrl;

  constructor(private httpService: HttpService) { }

  getMechanics(): Observable<MechanicsModel> {
    return this.httpService.getAll(`${this.baseUrl}/mechanic`);
  }
}
