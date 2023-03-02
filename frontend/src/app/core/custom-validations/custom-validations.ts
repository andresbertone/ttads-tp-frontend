import { formatDate } from "@angular/common";
import { AbstractControl } from "@angular/forms";

export class CustomValidations {

    static isNumber(control: AbstractControl) {
        if (isNaN(parseInt(control.value, 10))) {
            return { isNumber: true };
        }
        return null;
    }

    static isDateAfter(control: AbstractControl) {
        const today = formatDate(new Date(), 'MM-dd-YYYY', 'en-US');
        if (Date.parse(control.value) <= Date.parse(today)) {
            return { isDateBefore: true };
        }
        return null;
    }
    
}