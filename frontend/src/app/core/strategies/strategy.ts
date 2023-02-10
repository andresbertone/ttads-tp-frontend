import { Observable } from "rxjs";

export abstract class Strategy {
    
    route!: string;
    title!: string;
    
    constructor() { }

    abstract sendRequest(serviceMethod: any, id?: string): Observable<any>;

    abstract getDialogRef(form: any): Observable<any>;

    abstract showSnackBarMessage(model: any): void;
}