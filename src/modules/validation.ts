/// <reference path="regexp.d.ts" />
enum typeErrors {
    FORMAT_ERROR = 0,
    LENGTH_PWD_ERROR = 1,
    LITERAL_ERROR = 2,
    NUMERAL_ERROR = 3,
    GAP_ERROR = 4,
    LENGTH_ERROR = 5,
    PWDR_ERROR = 6,
    INEDITOR_ERROR = 7
};

function isValidEmail(idElement: string) {
    const result = { isValid: true, errors: [] };
    const errors: any[] = [];

    const elemEmail = <HTMLInputElement>document.getElementById(idElement);
    const email = elemEmail.value;
    if (email.length < 5)
        errors.push(typeErrors.LENGTH_ERROR);
    if (!REXP_EMAIL.test(email))
        errors.push(typeErrors.FORMAT_ERROR);
    if (email.search(REXP_GAP) >= 0)
        errors.push(typeErrors.GAP_ERROR);
    if (errors.length > 0)
        result.isValid = false;

    result.errors = errors;

    return result;
}

function isValidLogin(idElement: string) {
    const result = { isValid: true, errors: [] };
    const errors = [];

    const elemLogin = <HTMLInputElement>document.getElementById(idElement);

    const login = elemLogin.value;
    if (login.length < 5)
        errors.push(typeErrors.LENGTH_ERROR);
    if (!REXP_LOGIN.test(login))
        errors.push(typeErrors.FORMAT_ERROR);
    if (login.search(REXP_GAP) >= 0)
        errors.push(typeErrors.GAP_ERROR);
    if (errors.length > 0)
        result.isValid = false;
    result.errors = errors;

    return result;
};

function isValidPassword(idElement: string) {

    const result = { isValid: true, errors: [] };
    const errors = [];

    const elementPassword = <HTMLInputElement>document.getElementById(idElement);
    const password = elementPassword.value;
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
    if (errors.length > 0)
        result.isValid = false;

    const elementPasswordRepeat = <HTMLInputElement>document.getElementById(idElement);
    const passwordRepeat = elementPasswordRepeat.value;

    if (!(password === passwordRepeat))
        errors.push(typeErrors.PWDR_ERROR);

    result.errors = errors;
    return result;
}

function isValidMessage(idElement: string) {
    const result = { isValid: true, errors: [] };
    const errors = [];    
    const valueHTMLElement = <HTMLInputElement>document.getElementById(idElement);
    const valueElement = valueHTMLElement.value;
    if (valueElement.length < 1)
        errors.push(typeErrors.INEDITOR_ERROR);
    if (errors.length > 0)
        result.isValid = false;
    result.errors = errors;

    return result;
}

function validateEMail(idElement: string, nameHiddenError: string) {
    const resultValidate = isValidEmail(idElement);
    showErrors(resultValidate, idElement, nameHiddenError);
};

function validateLogin(idElement: string, nameHiddenError: string) {
    const resultValidate = isValidLogin(idElement);
    showErrors(resultValidate, idElement, nameHiddenError);
}

function validatePassword(idElement: string, nameHiddenError: string) {
    const resultValidate = isValidPassword(idElement);
    showErrors(resultValidate, idElement, nameHiddenError);
}

function validateMessage(idElement: string, nameHiddenError: string) {
    const resultValidate = isValidPassword(idElement);
    showErrors(resultValidate, idElement, nameHiddenError);
}

function showErrors(resultValidate, idElement: string, nameHiddenError: string) {
    let nameError = "err-" + idElement;
    if (resultValidate.errors.length > 0)
        nameError = nameError + String(resultValidate.errors[0]);
    const elementError = document.getElementById(nameError);
    if (!resultValidate.isValid) {
        showHiddenElement(elementError, nameHiddenError);
        return false;
    } else {
        hideHiddenElement(elementError, nameHiddenError);
        return true;
    }
}

function showHiddenElement(elementError: any, nameHiddenError: string) {
    if (elementError === void 0) { elementError = null; }
    if (nameHiddenError === void 0) { nameHiddenError = ''; }
    if (elementError != null)
        elementError.classList.remove(nameHiddenError);
}

function hideHiddenElement(elementError: any, nameHiddenError: string) {
    if (elementError === void 0) { elementError = null; }
    if (nameHiddenError === void 0) { nameHiddenError = ''; }
    if (elementError != null && (!elementError.classList.contains(nameHiddenError)))
        elementError.classList.add(nameHiddenError);
}

function setValidate(idInput, funcValidate, nameHiddenError) {
    const finput = document.getElementById(idInput);
    finput.addEventListener('blur', function (e) {
        funcValidate(idInput, nameHiddenError);
    });
}

function setFocus(arrInputs, nameHiddenError) {
    for (let i = 0; i < arrInputs.length; i++) {
        const id = arrInputs[i].input;
        const finput = document.getElementById(id);
        finput.addEventListener('focus', function (e) {
            elemFocus(id, nameHiddenError);
        });
    }
}

function elemFocus(id, nameHiddenError: string) {
    const arrMesPwd = [0, 1, 2, 3, 4, 5, 6, 7];
    const nameError = "err-" + id;
    const arrFields = [];
    for (let i = 0; i < arrMesPwd.length; i++)
        arrFields.push("" + nameError + arrMesPwd[i]);
    for (let i = 0; i < arrFields.length; i++) {
        const elementError = document.getElementById(arrFields[i]);
        if ((elementError != null) && (!elementError.classList.contains(nameHiddenError)))
            elementError.classList.add(nameHiddenError);
    }
}

function isValidValues(arrInputs, nameHiddenError: string) {
    for (let i = 0; i < arrInputs.length; i++) {
        const funcValidate = arrInputs[i].value;
        const idElement = arrInputs[i].input;
        const result = funcValidate(idElement);
        if (!result.isValid) {
            showErrors(result, idElement, nameHiddenError);
            return false;
        }
    }
    return true;
}