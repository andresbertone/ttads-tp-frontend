import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SparePartService } from 'src/app/core/services/spare-part.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { SparePartModel } from 'src/app/core/models/spare-part/spare-part.model';
import { Strategy } from 'src/app/core/strategies/strategy';
import { NewSparePartStrategy } from 'src/app/core/strategies/spare-part/new-spare-part-strategy';
import { EditSparePartStrategy } from 'src/app/core/strategies/spare-part/edit-spare-part-strategy';
import { CustomValidations } from 'src/app/core/custom-validations/custom-validations';

@Component({
  selector: 'app-new-spare-part',
  templateUrl: './new-spare-part.component.html',
  styleUrls: ['./new-spare-part.component.scss']
})
export class NewSparePartComponent implements OnInit {
  
  sparePartId! : string;
  sparePartStrategy! : Strategy;

  sparePartForm = this.formBuilder.group({
    sparePartCode: ['', Validators.required],
    sparePartDescription: ['', Validators.required],
    sparePartPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+([.][0-9]+)?$/), Validators.min(-1)]],
    stock: new FormControl<number | null>(null, [Validators.required, CustomValidations.isNumber, Validators.min(1)]),
    sparePartSupplier: ['', Validators.required]
  });


  constructor(
    private formBuilder: FormBuilder, 
    private sparePartService: SparePartService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.sparePartId = this.activatedRoute.snapshot.paramMap.get('sparePartId') as string;

    if (this.sparePartId) {
      this.sparePartStrategy = new EditSparePartStrategy(this.sparePartService, this.dialogService, this.alertService);
      this.getSparePart();
    } else {
      this.sparePartStrategy = new NewSparePartStrategy(this.sparePartService, this.dialogService, this.alertService);
    }
  }

  getSparePart() {
    this.sparePartService.getSparePartById(this.sparePartId).subscribe(
      (sparePart: SparePartModel) => {
        this.sparePartForm.patchValue(sparePart);
        this.sparePartForm.get('sparePartCode')?.disable();
      }
    );
  }

  onSubmit() {
    if (!this.sparePartForm.valid) return;

    const dialogRef$ = this.sparePartStrategy.getDialogRef(this.sparePartForm.value);

    dialogRef$.subscribe((result) => {
      if (!result) return; 

      this.sparePartForm.get('sparePartCode')?.enable();

      this.sparePartStrategy.sendRequest(this.sparePartForm.value, this.sparePartId)
        .subscribe({
          next: (sparePart: SparePartModel) => {
            this.sparePartStrategy.showSnackBarMessage(sparePart);
            this.router.navigate([this.sparePartStrategy.route]);
          },
          error: () => {
            if (this.isEditing()) {
              this.sparePartForm.get('sparePartCode')?.disable();
            }
          }
        });
    });
  }

  cancel() {
    if (!this.sparePartForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getDialogWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([this.sparePartStrategy.route]);
        }
      });
    } else {
      this.router.navigate([this.sparePartStrategy.route]);
    }
  }

  isEditing() {
    return this.sparePartStrategy instanceof EditSparePartStrategy;
  }

  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.sparePartForm, field);
  }

  getFieldHint(field: string) {
    return this.formValidationService.getFieldHint(this.sparePartForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.sparePartForm, field);
  }

}
