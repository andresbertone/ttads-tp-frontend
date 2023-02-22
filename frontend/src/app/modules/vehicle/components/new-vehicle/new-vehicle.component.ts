import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VehicleService } from 'src/app/core/services/vehicle.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';
import { Strategy } from 'src/app/core/strategies/strategy';
import { NewVehicleStrategy } from 'src/app/core/strategies/vehicle/new-vehicle-strategy';
import { CustomValidations } from 'src/app/core/custom-validations/custom-validations';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent {

  vehicleId! : string;
  vehicleStrategy! : Strategy;

  vehicleForm = this.formBuilder.group({
    licensePlate: ['', [Validators.required, Validators.pattern(/(^[a-zA-Z]{3}[0-9]{3}$)|(^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)/)]],
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', [Validators.required, CustomValidations.isNumber, Validators.min(1990), Validators.max(new Date().getFullYear())]],
    currentNumberOfKilometers: ['', [Validators.required, CustomValidations.isNumber, Validators.min(0)]],
    customerId: ['', Validators.required]
  });


  constructor(
    private formBuilder: FormBuilder, 
    private vehicleService: VehicleService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.vehicleId = this.activatedRoute.snapshot.paramMap.get('vehicleId') as string;

    if (this.vehicleId) {
      // TODO: Para cuando haga la edición
      // this.vehicleStrategy = new EditVehicleStrategy(this.vehicleService, this.dialogService, this.alertService);
      // this.getVehicle();
    } else {
      this.vehicleStrategy = new NewVehicleStrategy(this.vehicleService, this.dialogService, this.alertService);
    }
  }

  // TODO: Para cuando haga la edición
  // getVehicle() {
  //   this.vehicleService.getVehicleById(this.vehicleId).subscribe(
  //     (vehicle: VehicleModel) => {
  //       this.vehicleForm.patchValue(vehicle);
  //       this.vehicleForm.get('vehicleCode')?.disable();
  //     }
  //   );
  // }

  onSubmit() {
    const customerId = this.activatedRoute.snapshot.paramMap.get('customerId') as string
    this.vehicleForm.patchValue({
      customerId: customerId
    });

    if (!this.vehicleForm.valid) return;

    const dialogRef$ = this.vehicleStrategy.getDialogRef(this.vehicleForm.value);

    dialogRef$.subscribe((result) => {
      if (!result) return; 

      this.vehicleForm.get('vehicleCode')?.enable();

      this.vehicleStrategy.sendRequest(this.vehicleForm.value, this.vehicleId)
        .subscribe({
          next: (vehicle: VehicleModel) => {
            this.vehicleStrategy.showSnackBarMessage(vehicle);
            this.router.navigate([this.vehicleStrategy.route]);
          },
          error: () => {
            // TODO: Para cuando haga la edición
            // if (this.isEditing()) {
            //   this.vehicleForm.get('vehicleCode')?.disable();
            // }
          }
        });
    });
  }

  cancel() {
    if (!this.vehicleForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getModalWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([this.vehicleStrategy.route]);
        }
      });
    } else {
      this.router.navigate([this.vehicleStrategy.route]);
    }
  }

  // TODO: Para cuando haga la edición
  // isEditing() {
  //   return this.vehicleStrategy instanceof EditVehicleStrategy;
  // }

  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.vehicleForm, field);
  }

  getFieldHint(field: string) {
    return this.formValidationService.getFieldHint(this.vehicleForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.vehicleForm, field);
  }
}
