import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { SparePartService } from "../../services/spare-part.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";

import { SparePartModel } from "../../models/spare-part/spare-part.model";

export class EditSparePartStrategy extends Strategy {

    constructor(
        private sparePartService: SparePartService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        super();

        this.title = 'Edit Spare Part';
        this.route = 'home/spare-parts';
    }

    sendRequest(sparePartForm: FormGroup, sparePartId: string): Observable<any> {
        return this.sparePartService.editSparePart(sparePartForm, sparePartId);
    }

    getDialogRef(sparePartForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Edit spare part',
            [this.dialogService.getModalWarningMessage(sparePartForm, 'spare part', 'edit')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(sparePart: SparePartModel): void {
        this.alertService.openSnackBar(`The spare part ${sparePart.sparePartDescription} was successfully edited.`);
    }
}