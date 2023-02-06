import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MechanicService } from 'src/app/core/services/mechanic.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { MechanicModel } from 'src/app/core/models/mechanic/mechanic.model';

@Component({
  selector: 'app-new-mechanic',
  templateUrl: './new-mechanic.component.html',
  styleUrls: ['./new-mechanic.component.scss']
})
export class NewMechanicComponent {

  constructor(
    private formBuilder: FormBuilder, 
    private mechanicService: MechanicService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService) { }

  mechanicForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    registrationNumber: ['', [Validators.required, Validators.pattern(/^([0-9])*$/)]],
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
    if (this.mechanicForm.valid) {
      this.dialogService.showWarning(
        'Add mechanic',
        [this.dialogService.getModalWarningMessage(this.mechanicForm.value, 'mechanic', 'add')],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.mechanicService.newMechanic(this.mechanicForm.value).subscribe(
            (mechanic: MechanicModel) => {
              this.alertService.openSnackBar(`The mechanic ${mechanic.firstName} ${mechanic.lastName} was successfully added.`);
              window.history.back();
            }
          );
        }
      });
    }
  }

  cancel() {
    if (!this.mechanicForm.pristine) {
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
    return this.formValidationService.isFieldValid(this.mechanicForm, field);
  }

  getFieldHint(field: string) {
    return this.formValidationService.getFieldHint(this.mechanicForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.mechanicForm, field);
  }

}
