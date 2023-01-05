import { CustomerModel } from './customer.model';

export interface CustomersModel {
    records: CustomerModel[],
    total: number
}
