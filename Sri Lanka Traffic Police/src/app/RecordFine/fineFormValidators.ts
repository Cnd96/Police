import { AbstractControl, ValidationErrors } from '@angular/forms';


export class fineFormValidators{ 
    static licenseNoValidator(control:AbstractControl) : ValidationErrors |null{
        let license1=(/^(B)(\d{7})$/.test(control.value));
        let license2=(/^(N)(o)$/.test(control.value));
        if(!(license1||license2)){
            return {licenseNoInvalid:true};
        }
         return null;
    }

    static vehicleNoValidator(control:AbstractControl) : ValidationErrors |null{
        let vehicle1=(/^([A-Za-z]{2})([-]{1})([A-Za-z]{2})([-]{1})(\d{4})$/.test(control.value));
        let vehicle2=( /^([A-Za-z]{2})([-]{1})([A-Za-z]{3})([-]{1})(\d{4})$/.test(control.value));
        let vehicle3=(/^(N)(o)$/.test(control.value));
        let vehicle4=( /^(\d{2})([-]{1})(\d{4})$/.test(control.value));
        let vehicle5=( /^(\d{1})([-]{1})([A-Za-z]{3})([-]{1})(\d{4})$/.test(control.value));

        if(!(vehicle1||vehicle2||vehicle3||vehicle4||vehicle5)){
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