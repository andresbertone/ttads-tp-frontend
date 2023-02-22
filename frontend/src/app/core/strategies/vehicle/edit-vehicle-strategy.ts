import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { VehicleService } from "../../services/vehicle.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";

import { VehicleModel } from "../../models/vehicle/vehicle.model";

export class EditVehicleStrategy extends Strategy {

    constructor(
        private vehicleService: VehicleService,
        private dialogService: DialogService,
        private alertService: AlertService,
        private customerId: string
    ) {
        super();

        this.title = 'Edit Vehicle';
        this.route = `home/customers/detail/${this.customerId}`;
    }

    sendRequest(vehicleForm: FormGroup, vehicleId: string): Observable<any> {
        return this.vehicleService.editVehicle(vehicleForm, vehicleId);
    }

    getDialogRef(vehicleForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Edit vehicle',
            [this.dialogService.getDialogWarningMessage(vehicleForm, 'vehicle', 'edit')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(vehicle: VehicleModel): void {
        this.alertService.openSnackBar(`The vehicle ${vehicle.make} ${vehicle.model} was successfully edited.`);
    }
}