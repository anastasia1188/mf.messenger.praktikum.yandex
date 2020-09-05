function isValid(id) {
    const elem = document.getElementById(id);
    const text = elem.value;
    console.log(text);

    if (isEmpty(text)) {
        console.log('empty');
        return true;
    } else {
        switch (id) {
            case 'email':
                {
                    validateEMail(text);
                }

            case 'login':
                {
                    validateLogin(text);
                }

            case ('password'):
                {
                    validatePassword(text);
                }

            case 'passwordr':
                {
                    validatePassword(text);
                }
            case 'message':
                {
                    validateMessage(text);
                }


        }
        return false;
    }
}

function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
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
        let elemerr = document.getElementById(nameerr);
        if (!isValid(id)) {
            elemerr.classList.remove("hiddenerr");
            return false;
        } else {
            console.log("!", nameerr);
            console.log(elemerr.classList.contains("hiddenerr"));
            if (!elemerr.classList.contains("hiddenerr"))
                elemerr.classList.add("hiddenerr");
            console.log(elemerr.classList);
            return true;
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