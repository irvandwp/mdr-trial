import { ValidationErrors } from "@angular/forms";
import { VALIDATOR_MESSAGES } from "../../shared/const/validator-messages.const";


export const getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string|undefined => {
    let args = messages.get(validatorName)?.validatorErrorsKey?.map(name => validatorErrors?.[name]);
    return (args) ? stringFormat(messages.get(validatorName)?.message,...args) : messages.get(validatorName)?.message;
}

const  messages = VALIDATOR_MESSAGES;

function stringFormat(template: string|undefined, ...args: any[]) {
    if(template){
        return template.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined'
            ? args[index]
            : match;
        });
    }
    return undefined;
 }
