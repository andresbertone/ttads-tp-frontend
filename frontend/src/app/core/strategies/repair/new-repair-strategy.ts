import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { RepairService } from "../../services/repair.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";


export class NewRepairStrategy extends Strategy {

    constructor(
        private repairService: RepairService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        super();

        this.title = 'New Repair';
        this.route = 'home/repairs';
    }

    sendRequest(repairForm: FormGroup): Observable<any> {
        return this.repairService.newRepair(repairForm);
    }

    getDialogRef(repairForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Add repair',
            [this.dialogService.getDialogWarningMessage(repairForm, 'repair', 'add')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(): void {
        this.alertService.openSnackBar(`The repair was successfully registered.`);
    }
}