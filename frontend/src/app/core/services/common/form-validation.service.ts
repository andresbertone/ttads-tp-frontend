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
      message = 'Not a valid format';
    } else if (form.get(field)?.hasError('isNumber')) {
      message = 'You must enter only numbers';
    } else if (form.get(field)?.hasError('email')) {
      message = 'Not a valid email';
    } else if (form.get(field)?.hasError('minlength')) {
      message = 'At least ' + form.get(field).errors.minlength.requiredLength + ' characters';
    } else if (form.get(field)?.hasError('maxlength')) {
      message = 'Maximum ' + form.get(field).errors.maxlength.requiredLength + ' characters';
    } else if (form.get(field)?.hasError('min')) {
      message = 'The value must be greater than or equal to ' + form.get(field).errors.min.min;
    } else if (form.get(field)?.hasError('max')) {
      message = 'The value must be less than or equal to ' + form.get(field).errors.max.max;
    } else if (form.controls[field].hasError('isDateBefore')) {
      message = 'Date must be after today';
    } else if (form.controls[field].hasError('invalidCustomerSelection')) {
      message = 'You must select a customer from the list';
    } else if (form.controls[field].hasError('invalidMechanicSelection')) {
      message = 'You must select a mechanic from the list';
    } else if (form.controls[field].hasError('invalidSparePartSelection')) {
      message = 'You must select a spare part from the list';
    } else if (form.controls[field].hasError('insufficientStock')) {
      message = 'Insufficient stock';
    }

    return message;
  }
}
