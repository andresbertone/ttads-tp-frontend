import { CustomerModel } from './../customer/customer.model';
export interface VehicleModel {
    vehicleId: string,
    licensePlate: string,
    make: string,
    model: string,
    year: string,
    currentNumberOfKilometers: string,
    customerId: string,
    customer: CustomerModel
}
