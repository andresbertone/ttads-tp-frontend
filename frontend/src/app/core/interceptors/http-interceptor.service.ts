import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SpinnerService } from '../services/common/spinner.service';
import { DialogService } from '../services/common/dialog.service';
import { StorageService } from '../services/common/storage.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private storageService: StorageService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();

    const headers = this.getHeaders();
    const clonedReq = this.getClonedReq(req, { headers });

    return next.handle(clonedReq).pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }


  getHeaders() {
    const sessionToken = this.storageService.get('sessionToken');
    if (sessionToken) {
      return new HttpHeaders({
        'Authorization': `Bearer ${sessionToken}`
      });
    }

    return null;
  }

  getClonedReq(req: HttpRequest<any>, extraArgs: any) {
    return req.clone(extraArgs);
  }

  handleError(error: HttpErrorResponse) {    
    switch (error.status) {
      case 0:
        this.handleClientSideError(error);
        break;

      case 401: 
        return this.handleUnauthorizedError(error);
    
      case 403:
        this.handleForbiddenError(error);
        break;

      default:
        this.handleGenericError(error);
        break;
    }

    return Promise.reject('');
  }


  handleClientSideError(error: any) {
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
    )
  }

  handleUnauthorizedError(error: any) {
    const errorMessages = this.getBackendErrorMessages(error);
    this.router.navigateByUrl('/login');
    return Promise.reject({ error: errorMessages[0], status: error.status });
  }

  handleForbiddenError(error: any) {
    const errorMessages = this.getBackendErrorMessages(error);

    this.dialogService.showError(
      'Restricted',
      errorMessages,
      '',
      'Ok',
      false,
      'do_not_disturb_on'
    ).afterClosed().subscribe(() => {
      this.router.navigateByUrl('/login');
    })
  }

  handleGenericError(error: any) {
    const errorMessages = this.getBackendErrorMessages(error);

    this.dialogService.showError(
      'Validation error',
      errorMessages,
      '',
      'Ok',
      false
    )
  }


  getBackendErrorMessages(error: any) {
    // The backend returned an unsuccessful response code.
    console.error(`Backend returned code ${error.status}, response was: `, error.error);
    const { errors: backendErrors } = error.error;
    return this.getFormattedErrorMessageForDialog(backendErrors);
  }

  getFormattedErrorMessageForDialog(errors: any[]) {
    let message = '';
    const arrayOfMessages: any[] = [];

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
