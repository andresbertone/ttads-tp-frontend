import { HttpErrorModel } from './http-error.model';

export interface HttpResponseModel {
    status: number,
    error: HttpErrorModel[],
    data: any[]
}
