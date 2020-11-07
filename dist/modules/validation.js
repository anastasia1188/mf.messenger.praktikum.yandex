/// <reference path="regexp.d.ts" />
const typeErrors = {
    FORMAT_ERROR: 0,
    LENGTH_PWD_ERROR: 1,
    LITERAL_ERROR: 2,
    NUMERAL_ERROR: 3,
    GAP_ERROR: 4,
    LENGTH_ERROR: 5,
    PWDR_ERROR: 6,
    INEDITOR_ERROR: 7
};
function validateEMail() {
    return function (idElement, nameHiddenError) {
        const errors = [];
        const result = { isValid: true, errors: [] };
        const elemEmail = document.getElementById(idElement);
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
        return validate(result, idElement, nameHiddenError);
    };
}
function validateLogin() {
    return function (idElement, nameHiddenError) {
        const errors = [];
        const result = { isValid: true, errors: [] };
        const elemLogin = document.getElementById(idElement);
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
        return validate(result, idElement, nameHiddenError);
    };
}
function validatePassword() {
    return function (idElement, nameHiddenError) {
        const errors = [];
        const result = { isValid: true, errors: [] };
        const elemPassword = document.getElementById(idElement);
        const password = elemPassword.value;
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
        const elempasswordR = document.getElementById(idElement);
        const passwordRepeat = elempasswordR.value;
        if (!(password === passwordRepeat))
            errors.push(typeErrors.PWDR_ERROR);
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validateMessage() {
    return function (idElement, nameHiddenError) {
        const errors = [];
        const result = { isValid: true, errors: [] };
        const valueHTMLElement = document.getElementById(idElement);
        const valueElement = valueHTMLElement.value;
        if (valueElement.length < 1)
            errors.push(typeErrors.INEDITOR_ERROR);
        if (errors.length > 0)
            result.isValid = false;
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validate(resultValidate, idElement, nameHiddenError) {
    let nameError = "err-" + idElement;
    if (resultValidate.errors.length > 0)
        nameError = nameError + String(resultValidate.errors[0]);
    const elementError = document.getElementById(nameError);
    if (!resultValidate.isValid) {
        showHiddenElement(elementError, nameHiddenError);
        return false;
    }
    else {
        hideHiddenElement(elementError, nameHiddenError);
        return true;
    }
}
function showHiddenElement(elementError, nameHiddenError) {
    if (elementError === void 0) {
        elementError = null;
    }
    if (nameHiddenError === void 0) {
        nameHiddenError = '';
    }
    if (elementError != null)
        elementError.classList.remove(nameHiddenError);
}
function hideHiddenElement(elementError, nameHiddenError) {
    if (elementError === void 0) {
        elementError = null;
    }
    if (nameHiddenError === void 0) {
        nameHiddenError = '';
    }
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
function elemFocus(id, nameHiddenError) {
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
function isValidValues(arrInputs, nameHiddenError) {
    for (let i = 0; i < arrInputs.length; i++) {
        const funcValidate = arrInputs[i].value;
        const idElement = arrInputs[i].input;
        if (!funcValidate(idElement, nameHiddenError)) {
            return false;
        }
    }
    return true;
}
