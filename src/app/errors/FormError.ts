import { CustomError } from "./Errors";



const NO_NEGATIVE_FORM_VALUES = "Please choose a value greater than 0."
export class FormError extends CustomError {
    static NO_NEGATIVE_FORM_VALUES =  new FormError(0, 400, NO_NEGATIVE_FORM_VALUES);
}