import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';

import { ShiftService } from 'src/app/core/services/shift.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';
import { CustomValidations } from 'src/app/core/custom-validations/custom-validations';

import { CustomerModel } from 'src/app/core/models/customer/customer.model';
import { CustomersModel } from 'src/app/core/models/customer/customers.model';
import { ShiftModel } from 'src/app/core/models/shift/shift.model';

@Component({
  selector: 'app-new-shift',
  templateUrl: './new-shift.component.html',
  styleUrls: ['./new-shift.component.scss']
})
export class NewShiftComponent implements OnInit {

  customers: CustomerModel[] = [];
  filteredCustomers!: Observable<CustomerModel[]>;
  
  shiftForm = new FormGroup({
    shiftDate: new FormControl('', [Validators.required, CustomValidations.isDateAfter]),
    customer: new FormControl<string | CustomerModel>('', Validators.required)
  });


  constructor(
    private shiftService: ShiftService,
    private customerService: CustomerService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((response: CustomersModel) => {
      this.customers = response.records;

      this.filteredCustomers = this.getFilteredCustomers();
    });

  }

  onSubmit() {
    if (!this.shiftForm.valid) return;

    const formattedShiftDate = formatDate(this.shiftForm.value.shiftDate!, 'MM-dd-yyyy', 'en-US');
    
    if (typeof this.shiftForm.value.customer !== 'string') {
      const data = {
        shiftDate: formattedShiftDate, 
        customerId: this.shiftForm.value.customer!.customerId
      };

      this.dialogService.showWarning(
        'Schedule shift',
        [this.dialogService.getDialogWarningMessage(data, 'shift', 'schedule')],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (!result) return;

        this.shiftService.newShift(data).subscribe((shift: ShiftModel) => {
          const date = formatDate(shift.shiftDate, 'MM-dd-yyyy', 'en-US')
          this.alertService.openSnackBar(`The shift was successfully scheduled for ${date}.`);
          this.router.navigateByUrl('home/shifts');
        });
      })
    } else {
      return this.shiftForm.controls.customer.setErrors({ 'invalidCustomerSelection': true });
    }
  }

  cancel() {
    if (!this.shiftForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getDialogWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigateByUrl('home/shifts');
        }
      });
    } else {
      this.router.navigateByUrl('home/shifts');
    }
  }

  getFilteredCustomers(): Observable<CustomerModel[]> {
    return this.shiftForm.get('customer')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : `${value?.firstName} ${value?.lastName}`;
        
        return name ? this.filterCustomers(name as string) : this.customers.slice();
      }),
    );
  }
  
  filterCustomers(name: string): CustomerModel[] {
    const filterValue = name.toLowerCase();
    
    return this.customers.filter(
      customer => customer.firstName.toLowerCase().includes(filterValue) || 
      customer.lastName.toLowerCase().includes(filterValue)
    );
  }

  displayFn(customer: CustomerModel): string {
    return customer ? `${customer.firstName} ${customer.lastName}` : '';
  }
    
  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.shiftForm, field);
  }

  getFieldHint(field: string) {
    return this.formValidationService.getFieldHint(this.shiftForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.shiftForm, field);
  }

}
