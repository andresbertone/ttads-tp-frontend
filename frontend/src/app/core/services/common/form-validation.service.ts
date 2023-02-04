import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  isFieldValid(form: any, field: string) {
    return form.get(field).valid;
  }

  getFieldHint(form: any, field: string) {
    return form.get(field).value.length;
  }

  getFieldErrorMessage(form: any, field: string) {
    let message = '';

    if (form.get(field)?.hasError('required')) {
      message = 'You must enter a value';
    } else if (form.get(field)?.hasError('pattern')) {
      message = 'You must enter only numbers';
    } else if (form.get(field)?.hasError('email')) {
      message = 'Not a valid email';
    } else if(form.get(field)?.hasError('minlength')) {
      message = 'At least ' + form.get(field).errors.minlength.requiredLength + ' characters';
    } else if(form.get(field)?.hasError('maxlength')) {
      message = 'Maximum ' + form.get(field).errors.maxlength.requiredLength + ' characters';
    }

    return message;
  }
}
