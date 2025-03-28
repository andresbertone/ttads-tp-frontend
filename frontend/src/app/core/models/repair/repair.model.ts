import { VehicleModel } from "../vehicle/vehicle.model";
import { MechanicModel } from "../mechanic/mechanic.model";
import { SparePartModel } from "../spare-part/spare-part.model";

export interface RepairModel {
    repairId: number,
    entryDateTime: string,
    startDateTime: string,
    endDateTime: string,
    deliveryDateTime: string,
    status: string,
    initialDetail: string,
    comments: string,
    finalDescription: string,
    laborPrice: string,
    vehicleId: string,
    mechanicId: string,
    vehicle: VehicleModel,
    mechanic?: MechanicModel,
    spare_parts: SparePartModel[]
}
