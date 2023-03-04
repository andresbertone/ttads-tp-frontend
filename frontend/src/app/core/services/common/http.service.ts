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


  httpGetAll(
    url: string,
    options: any = {}
  ): Observable<any> {
    return this.get(url, options);
  }

  httpGet(
    url: string,
    options: any = {}
  ): Observable<any> {
    return this.get(url, options);
  }

  httpPost(url: string, body: any): Observable<any> {
    return this.post(url, body);
  }

  httpPut(url: string, body: any = {}): Observable<any> {
    return this.put(url, body);
  }

  httpDelete(url: string): Observable<any> {
    return this.delete(url);
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

  post(url: string, body: any): Observable<any> {
    return this.http.post<HttpResponseModel>(url, body)
      .pipe(
        map(res => {
          return res.data[0];
        })
      );
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put<HttpResponseModel>(url, body)
      .pipe(
        map(res => {
          return res.data[0];
        })
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<HttpResponseModel>(url)
      .pipe(
        map(res => {
          return res.data[0];
        })
      );
  }

  // ----------- End Backend Request -----------

  
  getQueryParams(options: any) {
    if (Object.entries(options).length > 0) {
      const queryParams = new URLSearchParams(options);
      const queryParamsString = queryParams.toString();
      
      return {
        params: new HttpParams({
          fromString: queryParamsString
        })
      };
    }
    return {};
  }

}
