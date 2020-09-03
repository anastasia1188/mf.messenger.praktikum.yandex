function isValid(id) {
    console.log(id);
    let elem = document.getElementById(id);
    let text = elem.value;
    console.log(text);

    if (isEmpty(text)) {
        console.log('empty');
        return true;
    }
    else {
        switch (id) {
            case 'email': {
                let rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
                return rexp.test(text);
            }

            case 'login': {
                let rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
                return rexp.test(text);
            }

            case ('password' || 'passwordr'): {
                let rexp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
                return rexp.test(text);
            }

            case 'message': {
                
                return true;
            }

        }
        return false;
    }
}

function validate(id) {

    return function (idName = id) {
        let nameerr = `err-${id}`;
        let elemerr = document.getElementById(nameerr);
        if (!isValid(id))
            elemerr.classList.remove("hiddenerr")
        else
            {
                console.log("!", nameerr);
                console.log(elemerr.classList.contains("hiddenerr"));
                if (!elemerr.classList.contains("hiddenerr"))
                elemerr.classList.add("hiddenerr");
                console.log(elemerr.classList);
            }
    }
}

function isEmpty(text) {
    return (text === "");
}