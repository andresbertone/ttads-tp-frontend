import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { RepairService } from "../../services/repair.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";


export class EditRepairStrategy extends Strategy {

    constructor(
        private repairService: RepairService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        super();

        this.title = 'Edit Repair';
        this.route = 'home/repairs';
    }

    sendRequest(repairForm: FormGroup, repairId: string): Observable<any> {
        return this.repairService.editRepair(repairForm, repairId);
    }

    getDialogRef(repairForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Edit repair',
            [this.dialogService.getDialogWarningMessage(repairForm, 'repair', 'edit')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(): void {
        this.alertService.openSnackBar(`The repair was successfully edited.`);
    }
}