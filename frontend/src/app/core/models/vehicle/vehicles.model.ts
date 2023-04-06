import { VehicleModel } from './vehicle.model';

export interface VehiclesModel {
    records: VehicleModel[],
    total: number
}