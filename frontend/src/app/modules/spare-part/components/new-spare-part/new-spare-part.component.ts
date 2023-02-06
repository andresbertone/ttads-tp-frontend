import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SparePartService } from 'src/app/core/services/spare-part.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';
import { SparePartModel } from 'src/app/core/models/spare-part/spare-part.model';

@Component({
  selector: 'app-new-spare-part',
  templateUrl: './new-spare-part.component.html',
  styleUrls: ['./new-spare-part.component.scss']
})
export class NewSparePartComponent {

  constructor(
    private formBuilder: FormBuilder, 
    private sparePartService: SparePartService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService) { }

  sparePartForm = this.formBuilder.group({
    sparePartCode: ['', Validators.required],
    sparePartDescription: ['', Validators.required],
    sparePartPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+([.][0-9]+)?$/), Validators.min(-1)]],
    stock: ['', [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.min(1)]],
    sparePartSupplier: ['', Validators.required]
  });

  onSubmit() {
    if (this.sparePartForm.valid) {
      this.dialogService.showWarning(
        'Add spare part',
        [this.dialogService.getModalWarningMessage(this.sparePartForm.value, 'spare part', 'add')],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.sparePartService.newSparePart(this.sparePartForm.value).subscribe(
            (sparePart: SparePartModel) => {
              this.alertService.openSnackBar(`The spare part ${sparePart.sparePartDescription} was successfully added.`);
              window.history.back();
            }
          );
        }
      });
    }
  }

  cancel() {
    if (!this.sparePartForm.pristine) {
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
    return this.formValidationService.isFieldValid(this.sparePartForm, field);
  }

  getFieldHint(field: string) {
    return this.formValidationService.getFieldHint(this.sparePartForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.sparePartForm, field);
  }

}
