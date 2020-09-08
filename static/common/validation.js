const FORMAT_ERROR = 0;
const LENGTH_PWD_ERROR = 1;
const LITERAL_ERROR = 2;
const NUMERAL_ERROR = 3;
const GAP_ERROR = 4;
const LENGTH_ERROR = 5;
const PWDR_ERROR = 6;
const INEDITOR_ERROR = 7;

function validateEMail() {
    return function(idElement, nameHiddenError) {

        let errors = [];
        let result = true;
        const email = document.getElementById(idElement).value;
        if (email.length < 5)
            errors.push(LENGTH_ERROR);

        if (!REXP_EMAIL.test(email))
            errors.push(FORMAT_ERROR);

        if (email.search(REXP_GAP) >= 0)
            errors.push(GAP_ERROR);

        if (errors.length > 0)
            result = errors;

        return validate(result, idElement, nameHiddenError);
    }
}

function validateLogin() {
    return function(idElement, nameHiddenError) {
        let result = true;
        let errors = [];
        const login = document.getElementById(idElement).value;
        if (login.length < 5)
            errors.push(LENGTH_ERROR);

        if (!REXP_LOGIN.test(login))
            errors.push(FORMAT_ERROR);

        if (login.search(REXP_GAP) >= 0)
            errors.push(GAP_ERROR);

        if (errors.length > 0)
            result = errors;

        return validate(result, idElement, nameHiddenError);
    }
}

function validatePassword() {
    return function(idElement, nameHiddenError) {
        let result = true;

        const password = document.getElementById(idElement).value;
        const errors = [];

        if (password.length < 8) {
            errors.push(LENGTH_PWD_ERROR);
        }
        if (password.search(REXP_LITERAL) < 0) {
            errors.push(LITERAL_ERROR);
        }
        if (password.search(REXP_NUMERAL) < 0) {
            errors.push(NUMERAL_ERROR);
        }
        if (password.search(REXP_GAP) >= 0) {
            errors.push(GAP_ERROR);
        }

        if (errors.length > 0) {
            result = errors;
        }

        return validate(result, idElement, nameHiddenError);
    }
}

function validatePasswordR() {
    return function(idElement, nameHiddenError) {
        let result = true;
        const errors = [];
        const passwordR = document.getElementById(idElement).value;
        const password = document.getElementById("password").value;
        if (!(password === passwordR))
            errors.push(PWDR_ERROR);

        if (errors.length > 0)
            result = errors;

        return validate(result, idElement, nameHiddenError);
    }
}

function validateMessage() {
    return function(idElement, nameHiddenError) {
        let result = true;
        const errors = [];
        const valueElement = document.getElementById(idElement).value;

        if (valueElement.length < 1)
            errors.push(INEDITOR_ERROR);

        if (errors.length > 0)
            result = errors;

        return validate(result, idElement, nameHiddenError);
    }
}

function validate(resultValidate, idElement, nameHiddenError) {
    let nameError = `err-${idElement}`;

    if (typeof(resultValidate) === 'object')
        nameError = nameError + String(resultValidate[0]);

    let elementError = document.getElementById(nameError);

    if (resultValidate !== true) {
        showHiddenElement(elementError, nameHiddenError);
        return false;
    } else {
        hideHiddenElement();
        return true;
    }
}

function showHiddenElement(elementError, nameHiddenError) {
    if (elementError != null)
        elementError.classList.remove(nameHiddenError);
}

function hideHiddenElement(elementError, nameHiddenError) {
    if (elementError != null && (!elementError.classList.contains(nameHiddenError)))
        elementError.classList.add(nameHiddenError);
}

function setValidate(idInput, funcValidate, nameHiddenError) {
    const finput = document.getElementById(idInput);
    finput.addEventListener('blur', function(e) {
        funcValidate(idInput, nameHiddenError);
    });
}

function setFocus(arrInputs, nameHiddenError) {
    for (let i = 0; i < arrInputs.length; i++) {
        const id = arrInputs[i].input;
        const finput = document.getElementById(id);

        finput.addEventListener('focus', function(e) {
            elemFocus(id, nameHiddenError)
        });
    }
}

function elemFocus(id, nameHiddenError) {
    const arrMesPwd = [0, 1, 2, 3, 4, 5, 6, 7];
    let nameError = `err-${id}`;
    const arrFields = [];

    for (let i = 0; i < arrMesPwd.length; i++)
        arrFields.push(`${nameError}${arrMesPwd[i]}`);

    for (let i = 0; i < arrFields.length; i++) {
        let elementError = document.getElementById(arrFields[i]);
        if ((elementError != null) && (!elementError.classList.contains(nameHiddenError)))
            elementError.classList.add(nameHiddenError);
    }
}

function isValidValues(arrInputs, nameHiddenError) {
    let result = true;

    for (let i = 0; i < arrInputs.length; i++) {
        const funcValidate = arrInputs[i].func;
        const idElement = arrInputs[i].input;

        if (!funcValidate(idElement, nameHiddenError)) {
            result = false;
        }
    }

    return result;
}