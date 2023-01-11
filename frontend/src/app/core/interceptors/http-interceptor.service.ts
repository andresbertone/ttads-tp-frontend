import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SpinnerService } from '../services/common/spinner.service';
import { DialogService } from './../services/common/dialog.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerService,
    private dialogService: DialogService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();

    // FIXME: Por el momento, no uso headers. Cuando haga lo del login tengo que agregar el token.
    // const headers = this.getHeaders();
    // const clonedReq = this.getClonedReq(req, { headers });

    // FIXME: Cuando agregue el uso de header con el token, cambiar "req" por "clonedReq".
    return next.handle(req).pipe(
      finalize(() => this.spinnerService.hideSpinner()),
      catchError(error => {
        this.dialogService.showError(
          'Error',
          'An error has occurred. Please try again.',
          'Cancel',
          'Accept',
          false
        );
        return this.handleError(error);
      })
    )
  };


  // getHeaders() {
  //   // FIXME: Por el momento, no uso headers. Cuando haga lo del login tengo que agregar el token.
  //   return new HttpHeaders({
  //     'token': '<value>'
  //   });
  // };

  getClonedReq(req: HttpRequest<any>, extraArgs: any) {
    return req.clone(extraArgs);
  };

  handleError(error: HttpErrorResponse) {
    const status = error.status;
    let errors;

    if (error.error) {
      const { errors: backendErrors } = error.error;
      if (backendErrors) {
        errors = backendErrors;
      } else if (error.message) {
        errors = [{ message: error.message }];
      }
    }

    const httpError = {status, errors};

    return Promise.reject(httpError);
  };
}
