import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { MechanicService } from "../../services/mechanic.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";

import { MechanicModel } from "../../models/mechanic/mechanic.model";

export class NewMechanicStrategy extends Strategy {

    constructor(
        private mechanicService: MechanicService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        super();

        this.title = 'New Mechanic';
        this.route = 'home/mechanics';
    }

    sendRequest(mechanicForm: FormGroup): Observable<any> {
        return this.mechanicService.newMechanic(mechanicForm);
    }

    getDialogRef(mechanicForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Add mechanic',
            [this.dialogService.getModalWarningMessage(mechanicForm, 'mechanic', 'add')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(mechanic: MechanicModel): void {
        this.alertService.openSnackBar(`The mechanic ${mechanic.firstName} ${mechanic.lastName} was successfully added.`);
    }
}