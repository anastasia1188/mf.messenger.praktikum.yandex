/// <reference path="regexp.d.ts" />
var FORMAT_ERROR = 0;
var LENGTH_PWD_ERROR = 1;
var LITERAL_ERROR = 2;
var NUMERAL_ERROR = 3;
var GAP_ERROR = 4;
var LENGTH_ERROR = 5;
var PWDR_ERROR = 6;
var INEDITOR_ERROR = 7;
function validateEMail() {
    return function (idElement, nameHiddenError) {
        var errors = [];
        var result = { isValid: true, errors: [] };
        var elemEmail = document.getElementById(idElement);
        var email = elemEmail.value;
        if (email.length < 5)
            errors.push(LENGTH_ERROR);
        if (!REXP_EMAIL.test(email))
            errors.push(FORMAT_ERROR);
        if (email.search(REXP_GAP) >= 0)
            errors.push(GAP_ERROR);
        if (errors.length > 0)
            result.isValid = false;
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validateLogin() {
    return function (idElement, nameHiddenError) {
        var errors = [];
        var result = { isValid: true, errors: [] };
        var elemLogin = document.getElementById(idElement);
        var login = elemLogin.value;
        if (login.length < 5)
            errors.push(LENGTH_ERROR);
        if (!REXP_LOGIN.test(login))
            errors.push(FORMAT_ERROR);
        if (login.search(REXP_GAP) >= 0)
            errors.push(GAP_ERROR);
        if (errors.length > 0)
            result.isValid = false;
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validatePassword() {
    return function (idElement, nameHiddenError) {
        var errors = [];
        var result = { isValid: true, errors: [] };
        var elemPassword = document.getElementById(idElement);
        var password = elemPassword.value;
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
        if (errors.length > 0)
            result.isValid = false;
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validatePasswordR() {
    return function (idElement, nameHiddenError) {
        var errors = [];
        var result = { isValid: true, errors: [] };
        var elempasswordR = document.getElementById(idElement);
        var elempassword = document.getElementById("password");
        var passwordR = elempasswordR.value;
        var password = elempassword.value;
        if (!(password === passwordR))
            errors.push(PWDR_ERROR);
        if (errors.length > 0)
            result.isValid = false;
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validateMessage() {
    return function (idElement, nameHiddenError) {
        var errors = [];
        var result = { isValid: true, errors: [] };
        var valueHTMLElement = document.getElementById(idElement);
        var valueElement = valueHTMLElement.value;
        if (valueElement.length < 1)
            errors.push(INEDITOR_ERROR);
        if (errors.length > 0)
            result.isValid = false;
        result.errors = errors;
        return validate(result, idElement, nameHiddenError);
    };
}
function validate(resultValidate, idElement, nameHiddenError) {
    var nameError = "err-" + idElement;
    if (resultValidate.errors.length > 0)
        nameError = nameError + String(resultValidate.errors[0]);
    var elementError = document.getElementById(nameError);
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
    var finput = document.getElementById(idInput);
    finput.addEventListener('blur', function (e) {
        funcValidate(idInput, nameHiddenError);
    });
}
function setFocus(arrInputs, nameHiddenError) {
    var _loop_1 = function (i) {
        var id = arrInputs[i].input;
        var finput = document.getElementById(id);
        finput.addEventListener('focus', function (e) {
            elemFocus(id, nameHiddenError);
        });
    };
    for (var i = 0; i < arrInputs.length; i++) {
        _loop_1(i);
    }
}
function elemFocus(id, nameHiddenError) {
    var arrMesPwd = [0, 1, 2, 3, 4, 5, 6, 7];
    var nameError = "err-" + id;
    var arrFields = [];
    for (var i = 0; i < arrMesPwd.length; i++)
        arrFields.push("" + nameError + arrMesPwd[i]);
    for (var i = 0; i < arrFields.length; i++) {
        var elementError = document.getElementById(arrFields[i]);
        if ((elementError != null) && (!elementError.classList.contains(nameHiddenError)))
            elementError.classList.add(nameHiddenError);
    }
}
function isValidValues(arrInputs, nameHiddenError) {
    var result = true;
    for (var i = 0; i < arrInputs.length; i++) {
        var funcValidate = arrInputs[i].value;
        var idElement = arrInputs[i].input;
        if (!funcValidate(idElement, nameHiddenError)) {
            result = false;
        }
    }
    return result;
}
