import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { CustomersModel } from './../models/customer/customers.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly baseUrl: string = environment.baseUrl;

  constructor(private httpService: HttpService) { }

  getCustomers(): Observable<CustomersModel> {
    return this.httpService.getAll(`${this.baseUrl}/customer`);
  }
}
