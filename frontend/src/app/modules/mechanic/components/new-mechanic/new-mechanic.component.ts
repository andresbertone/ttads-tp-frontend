import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MechanicService } from 'src/app/core/services/mechanic.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { MechanicModel } from 'src/app/core/models/mechanic/mechanic.model';
import { Strategy } from 'src/app/core/strategies/strategy';
import { NewMechanicStrategy } from 'src/app/core/strategies/mechanic/new-mechanic-strategy';
import { EditMechanicStrategy } from 'src/app/core/strategies/mechanic/edit-mechanic-strategy';

@Component({
  selector: 'app-new-mechanic',
  templateUrl: './new-mechanic.component.html',
  styleUrls: ['./new-mechanic.component.scss']
})
export class NewMechanicComponent implements OnInit {

  mechanicId! : string;
  mechanicStrategy! : Strategy;
  
  mechanicForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    registrationNumber: ['', [Validators.required, Validators.pattern(/^([0-9])*$/)]],
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
    private mechanicService: MechanicService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.mechanicId = this.activatedRoute.snapshot.paramMap.get('mechanicId') as string;

    if (this.mechanicId) {
      this.mechanicStrategy = new EditMechanicStrategy(this.mechanicService, this.dialogService, this.alertService);
      this.getMechanic();
    } else {
      this.mechanicStrategy = new NewMechanicStrategy(this.mechanicService, this.dialogService, this.alertService);
    }
  }

  getMechanic() {
    this.mechanicService.getMechanicById(this.mechanicId).subscribe(
      (mechanic: MechanicModel) => {
        this.mechanicForm.patchValue(mechanic);
        this.mechanicForm.get('registrationNumber')?.disable();
      }
    );
  }

  onSubmit() {
    if (!this.mechanicForm.valid) return;

    const dialogRef$ = this.mechanicStrategy.getDialogRef(this.mechanicForm.value);

    dialogRef$.subscribe((result) => {
      if (!result) return;

      this.mechanicForm.get('registrationNumber')?.enable();

      this.mechanicStrategy.sendRequest(this.mechanicForm.value, this.mechanicId)
        .subscribe({
          next: (mechanic: MechanicModel) => {
            this.mechanicStrategy.showSnackBarMessage(mechanic);
            this.router.navigate([this.mechanicStrategy.route]);
          },
          error: () => {
            if (this.isEditing()) {
              this.mechanicForm.get('registrationNumber')?.disable();
            }
          }
        });
    });
  }

  cancel() {
    if (!this.mechanicForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getDialogWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([this.mechanicStrategy.route]);
        }
      });
    } else {
      this.router.navigate([this.mechanicStrategy.route]);
    }
  }

  isEditing() {
    return this.mechanicStrategy instanceof EditMechanicStrategy;
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
