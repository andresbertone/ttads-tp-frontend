import { HttpErrorModel } from './http-error.model';

export interface HttpResponseModel {
    status: number,
    errors: HttpErrorModel[],
    data: any[]
}
