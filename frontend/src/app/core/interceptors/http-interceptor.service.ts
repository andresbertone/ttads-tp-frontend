import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SpinnerService } from '../services/common/spinner.service';
import { DialogService } from '../services/common/dialog.service';


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
      catchError(error => this.handleError(error)),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }


  // getHeaders() {
  //   // FIXME: Por el momento, no uso headers. Cuando haga lo del login tengo que agregar el token.
  //   return new HttpHeaders({
  //     'token': '<value>'
  //   });
  // };

  getClonedReq(req: HttpRequest<any>, extraArgs: any) {
    return req.clone(extraArgs);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      const errors = [{ message: error.message }];
      const httpError = {status: error.status, errors};
      console.error('An error occurred:', httpError);

      this.dialogService.showError(
        'Error',
        ['An error has occurred. Please try again.'],
        '',
        'Close',
        false
      );
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

      const { errors: backendErrors } = error.error;
      let errorMessages = this.getFormattedErrorMessageForDialog(backendErrors);

      this.dialogService.showError(
        'Validation error',
        errorMessages,
        '',
        'Ok',
        false
      )
    }

    return Promise.reject('');
  }

  getFormattedErrorMessageForDialog(errors: any[]) {
    let message = '';
    let arrayOfMessages: any[] = [];

    errors.forEach(error => {
      if (error.field) {
        message = `${error.field}: ${error.message}`;
      } else {
        message = `${error.message}`;
      }
      arrayOfMessages.push(message);
    });

    return arrayOfMessages;
  }
}
