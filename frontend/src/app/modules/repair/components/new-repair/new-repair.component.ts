import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

import { RepairService } from 'src/app/core/services/repair.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { RepairModel } from 'src/app/core/models/repair/repair.model';
import { CustomerModel } from 'src/app/core/models/customer/customer.model';
import { CustomersModel } from 'src/app/core/models/customer/customers.model';
import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';
import { VehiclesModel } from 'src/app/core/models/vehicle/vehicles.model';
import { Strategy } from 'src/app/core/strategies/strategy';
import { NewRepairStrategy } from 'src/app/core/strategies/repair/new-repair-strategy';
import { EditRepairStrategy } from 'src/app/core/strategies/repair/edit-repair-strategy';

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.scss']
})
export class NewRepairComponent implements OnInit {
  
  repairId! : string;
  repairStrategy! : Strategy;
  
  customers: CustomerModel[] = [];
  filteredCustomers!: Observable<CustomerModel[]>;
  
  vehicles: VehicleModel[] = [];
  
  repairForm = this.formBuilder.group({
    initialDetail: [null],
    comments: [null],
    vehicle: new FormControl<string | VehicleModel>('', [Validators.required]),
    vehicleId: [''],
    customer: new FormControl<string | CustomerModel>('', [Validators.required]),
    customerId: new FormControl()
  });


  constructor(
    private formBuilder: FormBuilder, 
    private repairService: RepairService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.repairId = this.activatedRoute.snapshot.paramMap.get('repairId') as string;

    if (this.repairId) {
      this.repairStrategy = new EditRepairStrategy(this.repairService, this.dialogService, this.alertService);

      // TODO: Para cuando haga el edit.
      // this.getRepair();
    } else {
      this.repairStrategy = new NewRepairStrategy(this.repairService, this.dialogService, this.alertService);
      this.repairForm.get('vehicle')?.disable();
      this.getCustomers();
    }
  }

  // TODO: Para cuando haga el edit.
  // getRepair() {
  //   this.repairService.getRepairById(this.repairId).subscribe(
  //     (repair: RepairModel) => {
  //       // console.log('getRepair: ', repair);
  //       // this.repairForm.patchValue(repair);
  //       // this.repairForm.get('registrationNumber')?.disable();
  //     }
  //   );
  // }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response: CustomersModel) => {
      this.customers = response.records;
      this.filteredCustomers = this.getFilteredCustomers();
    });
  }

  getVehiclesFromCustomer() {
    const customerId = (this.repairForm.value.customer as CustomerModel).customerId;
    this.vehicleService.getVehiclesFromCustomer(customerId).subscribe(
      (response: VehiclesModel) => {
        this.vehicles = response.records;
        this.repairForm.controls.vehicle.setValue('');
        this.repairForm.get('vehicle')?.enable();
      }
    );
  }

  onSubmit() {
    if (!this.repairForm.valid) return;

    if (typeof this.repairForm.value.customer !== 'string') {
      const dialogRef$ = this.repairStrategy.getDialogRef(this.repairForm.value);
    
      dialogRef$.subscribe((result) => {
        if (!result) return;

        this.repairForm.controls.vehicleId.setValue((this.repairForm.value.vehicle as VehicleModel).vehicleId)
        this.repairForm.controls.customerId.setValue((this.repairForm.value.customer as CustomerModel).customerId);

        this.repairStrategy.sendRequest(this.repairForm.value, this.repairId)
          .subscribe({
            next: (repair: RepairModel) => {
              this.repairStrategy.showSnackBarMessage(repair);
              this.router.navigate([this.repairStrategy.route]);
            },
            error: () => {
              // if (this.isEditing()) {
              //   this.repairForm.get('registrationNumber')?.disable();
              // }
            }
          })
      })
    } else {
      return this.repairForm.controls.customer.setErrors({ 'invalidCustomerSelection': true });
    }
  };

  cancel() {
    if (!this.repairForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getDialogWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([this.repairStrategy.route]);
        }
      });
    } else {
      this.router.navigate([this.repairStrategy.route]);
    }
  }

  getFilteredCustomers(): Observable<CustomerModel[]> {
    return this.repairForm.get('customer')!.valueChanges.pipe(
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

  isEditing() {
    return this.repairStrategy instanceof EditRepairStrategy;
  }

  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.repairForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.repairForm, field);
  }
}