import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { SparePartsModel } from './../models/spare-part/spare-parts.model';

@Injectable({
  providedIn: 'root'
})
export class SparePartService {

  readonly baseUrl: string = environment.baseUrl;

  constructor(private httpService: HttpService) { }

  getSpareParts(): Observable<SparePartsModel> {
    return this.httpService.httpGetAll(`${this.baseUrl}/sparePart`);
  }
}
