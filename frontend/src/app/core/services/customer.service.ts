import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';

import { environment } from 'src/environments/environment';
import { CustomersModel } from '../models/customer/customers.model';
import { CustomerModel } from '../models/customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly baseUrl: string = environment.baseUrl + '/customer';

  constructor(private httpService: HttpService) { }

  getCustomers(): Observable<CustomersModel> {
    return this.httpService.httpGetAll(this.baseUrl);
  }

  getCustomerById(customerId: string, options = {}): Observable<CustomerModel> {
    return this.httpService.httpGet(`${this.baseUrl}/${customerId}`, options);
  }

  newCustomer(customerData: any): Observable<CustomerModel> {
    return this.httpService.httpPost(this.baseUrl, customerData);
  }

  editCustomer(customerData: any, customerId: string): Observable<CustomerModel> {
    return this.httpService.httpPut(`${this.baseUrl}/${customerId}`, customerData);
  }

  deleteCustomer(customerId: number): Observable<CustomerModel> {
    return this.httpService.httpDelete(`${this.baseUrl}/${customerId}`);
  }
}
