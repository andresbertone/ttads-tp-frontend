import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CustomerService } from 'src/app/core/services/customer.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { CustomerModel } from 'src/app/core/models/customer/customer.model';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent {

  constructor(
    private formBuilder: FormBuilder, 
    private customerService: CustomerService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService) { }

  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dni: ['', [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.minLength(8), Validators.maxLength(8)]],
    street: ['', Validators.required],
    streetNumber: ['', Validators.required],
    floor: [null],
    apartment: [null],
    city: ['', Validators.required],
    province: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(10), Validators.maxLength(10)]]
  });

  onSubmit() {
    if (this.customerForm.valid) {
      this.dialogService.showWarning(
        'Add customer',
        [this.dialogService.getModalWarningMessage(this.customerForm.value, 'customer', 'add')],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.customerService.newCustomer(this.customerForm.value).subscribe(
            (customer: CustomerModel) => {
              this.alertService.openSnackBar(`The customer ${customer.firstName} ${customer.lastName} was successfully added.`);
              window.history.back();
            }
          );
        }
      });
    }
  }

  cancel() {
    if (!this.customerForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getModalWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          window.history.back();
        }
      });
    } else {
      window.history.back();
    }
  }


  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.customerForm, field);
  }

  getFieldHint(field: string) {
    return this.formValidationService.getFieldHint(this.customerForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.customerForm, field);
  }

}
