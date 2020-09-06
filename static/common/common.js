function getData(arrFields) {
    const result = [];
    for (let i = 0; i < arrFields.length; i++) {
        let idinput = arrFields[i];
        let finput = document.getElementById(idinput);
        result.push(finput.value);
    }
    return result;
}

function compileTemplate(idTemplate, context) {
    const elemTemplate = document.getElementById(idTemplate);
    const source = elemTemplate.innerHTML;
    const template = Handlebars.compile(source);
    const html = template(context);
    elemTemplate.innerHTML = html;
}

function setButtonEvents(idButton, arrInputs, nameHiddenErr) {
    const elemButton = document.getElementById(idButton);

    elemButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (isValidValues(arrInputs, nameHiddenErr)) {
                const data = getData(arrInputs);
                console.log(data);
            }
        }
    });

    elemButton.addEventListener('click', function(e) {
        if (isValidValues(arrInputs, nameHiddenErr)) {
            const data = getData(arrInputs);
            console.log(data);
        }
    })
}