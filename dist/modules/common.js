/// <reference path="common.d.ts" />
function getData(arrFields = []) {
    const result = [];
    let i;
    for (let i = 0; i < arrFields.length; i++) {
        let idinput = arrFields[i].input;
        let finput = document.getElementById(idinput);
        result.push(finput.value);
    }
    return result;
}
function compileTemplate(idTemplate, source, context) {
    const elemTemplate = document.querySelector(idTemplate);
    const template = Handlebars.compile(source);
    const html = template(context);
    elemTemplate.innerHTML = html;
    return html;
}
function setButtonEvents(idButton, arrInputs, nameHiddenErr) {
    const elemButton = document.getElementById(idButton);
    elemButton.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (isValidValues(arrInputs, nameHiddenErr)) {
                const data = getData(arrInputs);
                console.log(data);
                window.location.hash = '#chat';
            }
        }
    });
    elemButton.addEventListener('click', function (e) {
        if (isValidValues(arrInputs, nameHiddenErr)) {
            const data = getData(arrInputs);
            console.log(data);
            window.location.hash = '#chat';
        }
    });
}
