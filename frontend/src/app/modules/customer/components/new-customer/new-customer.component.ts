import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { CustomerModel } from 'src/app/core/models/customer/customer.model';
import { Strategy } from 'src/app/core/strategies/strategy';
import { NewCustomerStrategy } from 'src/app/core/strategies/customer/new-customer-strategy';
import { EditCustomerStrategy } from 'src/app/core/strategies/customer/edit-customer-strategy';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  customerId! : string;
  customerStrategy! : Strategy;

  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dni: ['', [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.minLength(8), Validators.maxLength(8)]],
    street: ['', Validators.required],
    streetNumber: ['', Validators.required],
    floor: [''],
    apartment: [''],
    city: ['', Validators.required],
    province: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(10), Validators.maxLength(10)]]
  });


  constructor(
    private formBuilder: FormBuilder, 
    private customerService: CustomerService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('customerId') as string;

    if (this.customerId) {
      this.customerStrategy = new EditCustomerStrategy(this.customerService, this.dialogService, this.alertService);
      this.getCustomer();
    } else {
      this.customerStrategy = new NewCustomerStrategy(this.customerService, this.dialogService, this.alertService);
    }
  }

  getCustomer() {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (customer: CustomerModel) => {
        this.customerForm.patchValue(customer);
        this.customerForm.get('dni')?.disable();
      }
    );
  }

  onSubmit() {
    if (!this.customerForm.valid) return;

    const dialogRef$ = this.customerStrategy.getDialogRef(this.customerForm.value);

    dialogRef$.subscribe((result) => {
      if (!result) return; 

      this.customerForm.get('dni')?.enable();

      this.customerStrategy.sendRequest(this.customerForm.value, this.customerId)
        .subscribe({
          next: (customer: CustomerModel) => {
            this.customerStrategy.showSnackBarMessage(customer);
            this.router.navigate([this.customerStrategy.route]);
          },
          error: () => {
            if (this.isEditing()) {
              this.customerForm.get('dni')?.disable();
            }
          }
        });
    });
  }

  cancel() {
    if (!this.customerForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getDialogWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([this.customerStrategy.route]);
        }
      });
    } else {
      this.router.navigate([this.customerStrategy.route]);
    }
  }

  isEditing() {
    return this.customerStrategy instanceof EditCustomerStrategy;
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
