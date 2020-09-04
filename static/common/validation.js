function isValid(id) {
    console.log(id);
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
                    const rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
                    return rexp.test(text);
                }

            case 'login':
                {
                    const rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
                    return rexp.test(text);
                }

            case ('password' || 'passwordr'):
                {
                    const rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
                    return rexp.test(text);
                }

            case 'message':
                {
                    return true;
                }

        }
        return false;
    }
}

function validate(id) {

    return function(idName = id) {
        let nameerr = `err-${id}`;
        let elemerr = document.getElementById(nameerr);
        if (!isValid(idName)) {
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

function isEmpty(text) {
    return (text === "");
}

function setValidate(arrInputs) {
    for (let i = 0; i < arrInputs.length; i++) {
        let id = arrInputs[i];
        const finput = document.getElementById(id);
        finput.addEventListener('blur', validate(id));
    }
}