import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { VehicleService } from "../../services/vehicle.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";

import { VehicleModel } from "../../models/vehicle/vehicle.model";

export class NewVehicleStrategy extends Strategy {

    constructor(
        private vehicleService: VehicleService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        super();

        this.title = 'New Vehicle';
        this.route = 'home/customers';
    }

    sendRequest(vehicleForm: FormGroup): Observable<any> {
        return this.vehicleService.newVehicle(vehicleForm);
    }

    getDialogRef(vehicleForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Add vehicle',
            [this.dialogService.getModalWarningMessage(vehicleForm, 'vehicle', 'add')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(vehicle: VehicleModel): void {
        this.alertService.openSnackBar(`The vehicle ${vehicle.make} ${vehicle.model} was successfully added.`);
    }
}