/// <reference path="common.d.ts" />
interface ObjectInterface {
    [key: string]: string;
}
function getData(arrFields: { input: string, value: string }[] = []): Object {
    const result: ObjectInterface = {};

    for (let i = 0; i < arrFields.length; i++) {
        const idinput: string = arrFields[i].input;
        const finput = <HTMLInputElement>document.getElementById(idinput);
        result[idinput] = finput.value;
    }
    return result;
}

function compileTemplate(idTemplate: string, source: string, context: object) {
    const elemTemplate: HTMLElement = document.querySelector(idTemplate);
    const template: any = Handlebars.compile(source);
    const html = template(context);
    elemTemplate.innerHTML = html;
    return html;
}

function setButtonEvents(idButton: string, arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
    const elemButton: HTMLElement = document.getElementById(idButton);
    elemButton.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            goNextPage(arrInputs, nameHiddenErr);
        }
    });

    elemButton.addEventListener('click', function (e) {
        goNextPage(arrInputs, nameHiddenErr);
    })
}

function goNextPage(arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
        const data: any = getData(arrInputs);
        console.log(data);
        window.location.hash = '#chat';
    }

function setFormEvents(arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        goNextPage(arrInputs, nameHiddenErr);
    });
}

function deepEqual(obj1: object, obj2: object) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}