import { REXP_EMAIL, REXP_LOGIN, REXP_LITERAL, REXP_NUMERAL, REXP_GAP, } from './regExps';
var typeErrors;
(function (typeErrors) {
    typeErrors[typeErrors["FORMAT_ERROR"] = 0] = "FORMAT_ERROR";
    typeErrors[typeErrors["LENGTH_PWD_ERROR"] = 1] = "LENGTH_PWD_ERROR";
    typeErrors[typeErrors["LITERAL_ERROR"] = 2] = "LITERAL_ERROR";
    typeErrors[typeErrors["NUMERAL_ERROR"] = 3] = "NUMERAL_ERROR";
    typeErrors[typeErrors["GAP_ERROR"] = 4] = "GAP_ERROR";
    typeErrors[typeErrors["LENGTH_ERROR"] = 5] = "LENGTH_ERROR";
    typeErrors[typeErrors["PWDR_ERROR"] = 6] = "PWDR_ERROR";
    typeErrors[typeErrors["INEDITOR_ERROR"] = 7] = "INEDITOR_ERROR";
})(typeErrors || (typeErrors = {}));
function showHiddenElement(elementError, nameHiddenError) {
    if ((elementError !== undefined) && (elementError !== null)) {
        elementError.classList.remove(nameHiddenError);
    }
}
function hideHiddenElement(elementError, nameHiddenError) {
    if ((elementError !== undefined) && (elementError !== null)
        && (!elementError.classList.contains(nameHiddenError))) {
        elementError.classList.add(nameHiddenError);
    }
}
function showErrors(resultValidate, idElement, nameHiddenError) {
    let nameError = `err-${idElement}`;
    if (resultValidate.errors.length > 0)
        nameError += String(resultValidate.errors[0]);
    const elementError = document.getElementById(nameError);
    if (!resultValidate.isValid) {
        showHiddenElement(elementError, nameHiddenError);
        return false;
    }
    hideHiddenElement(elementError, nameHiddenError);
    return true;
}
function getValueElement(idElement) {
    let result;
    const element = document.getElementById(idElement);
    if (element !== null) {
        result = element.value;
    }
    return result;
}
export function isValidEmail(email) {
    const result = {
        isValid: true,
        errors: [],
    };
    const errors = [];
    if (email.length < 5) {
        errors.push(typeErrors.LENGTH_ERROR);
    }
    if (!REXP_EMAIL.test(email)) {
        errors.push(typeErrors.FORMAT_ERROR);
    }
    if (email.search(REXP_GAP) >= 0) {
        errors.push(typeErrors.GAP_ERROR);
    }
    if (errors.length > 0) {
        result.isValid = false;
    }
    result.errors = errors;
    return result;
}
export function isValidLogin(login) {
    const result = {
        isValid: true,
        errors: [],
    };
    const errors = [];
    if (login.length < 5) {
        errors.push(typeErrors.LENGTH_ERROR);
    }
    if (!REXP_LOGIN.test(login)) {
        errors.push(typeErrors.FORMAT_ERROR);
    }
    if (login.search(REXP_GAP) >= 0) {
        errors.push(typeErrors.GAP_ERROR);
    }
    if (errors.length > 0) {
        result.isValid = false;
    }
    result.errors = errors;
    return result;
}
export function isValidName(login) {
    const result = {
        isValid: true,
        errors: [],
    };
    const errors = [];
    if (login.length < 5) {
        errors.push(typeErrors.LENGTH_ERROR);
    }
    if (login.search(REXP_GAP) >= 0) {
        errors.push(typeErrors.GAP_ERROR);
    }
    if (errors.length > 0) {
        result.isValid = false;
    }
    result.errors = errors;
    return result;
}
export function isValidPassword(password) {
    const result = {
        isValid: true,
        errors: [],
    };
    const errors = [];
    if (password.length < 8) {
        errors.push(typeErrors.LENGTH_PWD_ERROR);
    }
    if (password.search(REXP_LITERAL) < 0) {
        errors.push(typeErrors.LITERAL_ERROR);
    }
    if (password.search(REXP_NUMERAL) < 0) {
        errors.push(typeErrors.NUMERAL_ERROR);
    }
    if (password.search(REXP_GAP) >= 0) {
        errors.push(typeErrors.GAP_ERROR);
    }
    if (errors.length > 0) {
        result.isValid = false;
    }
    const passwordRepeat = getValueElement('passwordr');
    if ((passwordRepeat !== undefined) && (!(password === passwordRepeat))) {
        errors.push(typeErrors.PWDR_ERROR);
    }
    result.errors = errors;
    return result;
}
export function isValidMessage(message) {
    const result = {
        isValid: true,
        errors: [],
    };
    const errors = [];
    if (message.length < 1) {
        errors.push(typeErrors.INEDITOR_ERROR);
    }
    if (errors.length > 0) {
        result.isValid = false;
    }
    result.errors = errors;
    return result;
}
export function validateEMail(idElement, nameHiddenError) {
    const value = getValueElement(idElement);
    const resultValidate = isValidEmail(value);
    showErrors(resultValidate, idElement, nameHiddenError);
}
export function validateLogin(idElement, nameHiddenError) {
    const value = getValueElement(idElement);
    const resultValidate = isValidLogin(value);
    showErrors(resultValidate, idElement, nameHiddenError);
}
export function validateName(idElement, nameHiddenError) {
    const value = getValueElement(idElement);
    const resultValidate = isValidName(value);
    showErrors(resultValidate, idElement, nameHiddenError);
}
export function validatePassword(idElement, nameHiddenError) {
    const value = getValueElement(idElement);
    const resultValidate = isValidPassword(value);
    showErrors(resultValidate, idElement, nameHiddenError);
}
export function validateMessage(idElement, nameHiddenError) {
    const value = getValueElement(idElement);
    const resultValidate = isValidMessage(value);
    showErrors(resultValidate, idElement, nameHiddenError);
}
export function setValidate(idInput, funcValidate, nameHiddenError) {
    const finput = document.getElementById(idInput);
    finput.addEventListener('blur', (e) => {
        funcValidate(idInput, nameHiddenError);
    });
}
export function elemFocus(id, nameHiddenError) {
    const arrMesPwd = [0, 1, 2, 3, 4, 5, 6, 7];
    const nameError = `err-${id}`;
    const arrFields = [];
    for (let i = 0; i < arrMesPwd.length; i++) {
        arrFields.push(`${nameError}${arrMesPwd[i]}`);
    }
    for (let i = 0; i < arrFields.length; i++) {
        const elementError = document.getElementById(arrFields[i]);
        if ((elementError != null) && (!elementError.classList.contains(nameHiddenError))) {
            elementError.classList.add(nameHiddenError);
        }
    }
}
export function setFocus(arrInputs, nameHiddenError) {
    for (let i = 0; i < arrInputs.length; i++) {
        const id = arrInputs[i].input;
        const finput = document.getElementById(id);
        finput.addEventListener('focus', (e) => {
            elemFocus(id, nameHiddenError);
        });
    }
}
export function isValidValues(arrInputs, nameHiddenError) {
    for (let i = 0; i < arrInputs.length; i++) {
        const funcValidate = arrInputs[i].value;
        const idElement = arrInputs[i].input;
        const value = getValueElement(idElement);
        const result = funcValidate(value);
        if (!result.isValid) {
            showErrors(result, idElement, nameHiddenError);
            return false;
        }
    }
    return true;
}
