/// <reference path="common.d.ts" />
function getData(arrFields = []) {
    const result = [];
    for (let i = 0; i < arrFields.length; i++) {
        const idinput = arrFields[i].input;
        const finput = document.getElementById(idinput);
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
            goNextPage(arrInputs, nameHiddenErr);
        }
    });
    elemButton.addEventListener('click', function (e) {
        goNextPage(arrInputs, nameHiddenErr);
    });
}
function goNextPage(arrInputs, nameHiddenErr) {
    if (isValidValues(arrInputs, nameHiddenErr)) {
        const data = getData(arrInputs);
        console.log(data);
        window.location.hash = '#chat';
    }
}
function setFormEvents(arrInputs, nameHiddenErr) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        goNextPage(arrInputs, nameHiddenErr);
    });
}
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
