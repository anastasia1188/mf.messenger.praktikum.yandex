interface ObjectInterface {
    [key: string]: string;
}
declare function compileTemplate(nameTemplate: string, template: string, context: object);
declare function getTemplate404(): string;
declare function getTemplate500(): string;
declare function getTemplateChat(): string;
declare function isValidValues(arrInputs:unknown[], namehiddenError:string): string;
declare function getData(arrInputs: unknown[]): ObjectInterface;
declare function validateMessage():string;
declare function getTemplateLogin():string;
declare function setValidate(idInput:string, funcValidate, nameHiddenError:string);
declare function setFocus(arrInputs, nameHiddenError);
declare function validateLogin();
declare function validatePassword();
declare function validatePasswordR();
declare function validateMessage();
declare function setButtonEvents(idButton:string, arrInputs: unknown[], nameHiddenErr:string);
declare function getTemplateRegistration():string;
declare function validateEMail();
declare function getTemplateSettings();
declare function setFormEvents(arrInputs: { input: string, value: any}[], nameHiddenErr:string);
declare function goNextPage(arrInputs: { input: string, value: any }[], nameHiddenErr: string);
declare function registration(user);
