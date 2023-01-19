import { SparePartModel } from './spare-part.model';

export interface SparePartsModel {
    records: SparePartModel[],
    total: number
}
