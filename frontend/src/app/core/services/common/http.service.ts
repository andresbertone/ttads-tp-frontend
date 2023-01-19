import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpResponseModel } from './../../models/http/http-response.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient ) { }


  getAll(
    url: string,
    options: any = {}
  ): Observable<any> {
    return this.get(url, options);
  }


  // ----------- Begin Backend Request -----------

  get(
    url: string,
    options: any
  ): Observable<any> {
    return this.http.get<HttpResponseModel>(url, this.getQueryParams(options))
      .pipe(
        map((res) => {
          return res.data[0];
        })
      );
  }

  // ----------- End Backend Request -----------

  
  getQueryParams(options: any) {
    if (Object.entries(options).length > 0) {
      const {
        limit = 10,
        offset = 0,
        query = ''
      } = options;
      return {
        params: new HttpParams({
          fromString: `limit=${limit}&offset=${offset}&query=${query}`
        })
      };
    }
    return {};
  }

}
