import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Strategy } from "../strategy";

import { CustomerService } from "../../services/customer.service";
import { DialogService } from '../../services/common/dialog.service';
import { AlertService } from "../../services/common/alert.service";

import { CustomerModel } from "../../models/customer/customer.model";

export class EditCustomerStrategy extends Strategy {

    constructor(
        private customerService: CustomerService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        super();

        this.title = 'Edit Customer';
        this.route = 'home/customers';
    }

    sendRequest(customerForm: FormGroup, customerId: string): Observable<any> {
        return this.customerService.editCustomer(customerForm, customerId);
    }

    getDialogRef(customerForm: FormGroup): Observable<any> {
        return this.dialogService.showWarning(
            'Edit customer',
            [this.dialogService.getDialogWarningMessage(customerForm, 'customer', 'edit')],
            'No',
            'Yes',
            true
        ).afterClosed();
    }

    showSnackBarMessage(customer: CustomerModel): void {
        this.alertService.openSnackBar(`The customer ${customer.firstName} ${customer.lastName} was successfully edited.`);
    }
}