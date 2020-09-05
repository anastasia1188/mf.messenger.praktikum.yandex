function isValid(id) {
    const elem = document.getElementById(id);
    const text = elem.value;

    if (isEmpty(text)) {
        return true;
    } else {
        switch (id) {
            case 'email':
                {
                    return validateEMail(text);
                }

            case 'login':
                {
                    return validateLogin(text);
                }

            case ('password'):
                {
                    return validatePassword(text);
                }

            case 'passwordr':
                {
                    const valuePwd = document.getElementById("password").value;
                    return validatePasswordR(text, valuePwd);
                }
            case 'ineditor':
                {
                    return validateMessage(text);
                }


        }
        return false;
    }
}

function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push(1);
    }
    if (password.search(/[a-z]/i) < 0) {
        errors.push(2);
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push(3);
    }
    if (errors.length > 0) {
        return errors;
    }
    return true;
}

function validatePasswordR(value1, value2) {
    if (value1 === value2)
        return true;
    return false;
}

function validateEMail(email) {
    const rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
    return rexp.test(email);
}

function validateMessage() {
    return true;
}

function validate(idV) {
    return function(id = idV) {
        let nameerr = `err-${id}`;
        const resVal = isValid(id);
        if (typeof(resVal) === 'object') {
            nameerr = nameerr + String(resVal[0]);
        }
        let elemerr = document.getElementById(nameerr);
        if (resVal !== true) {
            if (elemerr != null) {
                if (elemerr.classList.remove("hiddenerr"))
                    return false;
            }
        } else {
            if (elemerr != null) {
                if (!elemerr.classList.contains("hiddenerr"))
                    elemerr.classList.add("hiddenerr");
                return true;
            }
        }
    }
}

function validateLogin(text) {
    let rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
    return rexp.test(text);
}

function isEmpty(text) {
    return (text === "");
}

function setValidate(arrInputs) {
    for (let i = 0; i < arrInputs.length; i++) {
        let id = arrInputs[i];
        const finput = document.getElementById(id);
        const func = validate(id);
        finput.addEventListener('blur', function(e) {
            func();
        });
    }
}

function setFocus(arrInputs) {
    for (let i = 0; i < arrInputs.length; i++) {
        let id = arrInputs[i];
        let finput = document.getElementById(id);
        let className = finput.getAttribute("type");

        finput.addEventListener('focus', function(e) {
            elemFocus(id, className)
        });
    }
}

function elemFocus(id, className) {
    const arrMesPwd = [1, 2, 3];
    let nameerr = `err-${id}`;
    const arrFields = [];
    if ((className === "password") || (className === "passwordr")) {
        for (let i = 0; i < arrMesPwd.length; i++)
            arrFields.push(`${nameerr}${arrMesPwd[i]}`);
    } else {
        arrFields.push(nameerr);
    }
    for (let i = 0; i < arrFields.length; i++) {
        let elemerr = document.getElementById(arrFields[i]);
        if (elemerr != null) {
            if (!elemerr.classList.contains("hiddenerr"))
                elemerr.classList.add("hiddenerr");
        }
    }
}

function isValidValues(arrInputs) {
    result = true;
    for (let i = 0; i < arrInputs.length; i++) {
        if (!validate(arrInputs[i])())
            result = false;
    }
    return result;
}