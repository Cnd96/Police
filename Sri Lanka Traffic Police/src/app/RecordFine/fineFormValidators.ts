import { AbstractControl, ValidationErrors } from '@angular/forms';


export class fineFormValidators{
    
    static licenseNoValidator(control:AbstractControl) : ValidationErrors |null{
        if(!(/^(B)(\d{7})$/.test(control.value))){
            return {licenseNoInvalid:true};
        }
        return null;
    }

    static vehicleNoValidator(control:AbstractControl) : ValidationErrors |null{
        if(!((/^([A-Za-z]{2})([-]{1})([A-Za-z]{2})([-]{1})(\d{4})$/.test(control.value))||( /^([A-Za-z]{2})([-]{1})([A-Za-z]{3})([-]{1})(\d{4})$/.test(control.value)))){
            return {vehicleNoInvalid:true};
        }
        return null;
    }

    static policemanIdValidator(control:AbstractControl) : ValidationErrors |null{
        if(!(/(\d{5})$/.test(control.value))){
            return {policemanIdInvalid:true};
        }
        return null;
    }
}