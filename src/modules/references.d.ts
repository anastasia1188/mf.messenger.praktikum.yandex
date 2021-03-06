declare function compileTemplate(nameTemplate: string, template: string, context: object);
declare function getTemplate404(): string;
declare function getTemplate500(): string;
declare function getTemplateChat(): string;
declare function isValidValues(arrInputs: unknown[], namehiddenError: string): string;
declare function getData(arrInputs: unknown[]): ObjectInterface;
declare function validateMessage(idElement: string, nameHiddenError: string): string;
declare function getTemplateLogin(): string;
declare function setValidate(idInput: string, funcValidate, nameHiddenError: string);
declare function setFocus(arrInputs, nameHiddenError);
declare function validateLogin(idElement: string, nameHiddenError: string);
declare function validatePassword(idElement: string, nameHiddenError: string);
declare function validatePasswordR(idElement: string, nameHiddenError: string);
declare function setButtonEvents(idButton: string, arrInputs: unknown[], nameHiddenErr: string);
declare function getTemplateRegistration(): string;
declare function validateEMail();
declare function getTemplateSettings();
declare function deepEqual(obj1: object, obj2: object);
declare function isValidEmail(email: string);
declare function isValidLogin(login: string);
declare function isValidPassword(password: string);
declare function isValidMessage(message: string);
declare let idUser: string;
