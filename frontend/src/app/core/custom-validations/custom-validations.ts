import { AbstractControl } from "@angular/forms";

export class CustomValidations {

    static isNumber(control: AbstractControl) {
        if (isNaN(parseInt(control.value, 10))) {
            return { isNumber: true };
        }
        return null;
    }
    
}