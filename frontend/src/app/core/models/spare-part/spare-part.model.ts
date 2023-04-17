import { RepairSpare } from "../repair-spare/repair-spare.model";

export interface SparePartModel {
    sparePartId: number,
    sparePartCode: string,
    sparePartDescription: string,
    sparePartPrice: string,
    stock: string,
    sparePartSupplier: string,
    repair_spare: RepairSpare
}