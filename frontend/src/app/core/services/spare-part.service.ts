import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { SparePartsModel } from '../models/spare-part/spare-parts.model';
import { SparePartModel } from '../models/spare-part/spare-part.model';

@Injectable({
  providedIn: 'root'
})
export class SparePartService {

  readonly baseUrl: string = environment.baseUrl + '/sparePart';

  constructor(private httpService: HttpService) { }

  getSpareParts(): Observable<SparePartsModel> {
    return this.httpService.httpGetAll(this.baseUrl);
  }

  getSparePartById(sparePartId: string): Observable<SparePartModel> {
    return this.httpService.httpGet(`${this.baseUrl}/${sparePartId}`);
  }

  newSparePart(sparePartData: any): Observable<SparePartModel> {
    return this.httpService.httpPost(this.baseUrl, sparePartData);
  }

  editSparePart(sparePartData: any, sparePartId: string): Observable<SparePartModel> {
    return this.httpService.httpPut(`${this.baseUrl}/${sparePartId}`, sparePartData);
  }

  deleteSparePart(sparePartId: number): Observable<SparePartModel> {
    return this.httpService.httpDelete(`${this.baseUrl}/${sparePartId}`);
  }
}
