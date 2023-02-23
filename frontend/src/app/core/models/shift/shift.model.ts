import { CustomerModel } from './../customer/customer.model';

export interface ShiftModel {
    shiftId: number,
    shiftDate: string,
    shiftCancellationDate: string,
    status: string,
    customerId: string,
    customer: CustomerModel
}