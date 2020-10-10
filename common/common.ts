/// <reference path="common.d.ts" />
function getData(arrFields: { input: string, value: any}[] = []):unknown[] {
    const result: string[] = [];
    let i: number;
    for (let i = 0; i < arrFields.length; i++) {
        let idinput:string = arrFields[i].input;
        let finput = <HTMLInputElement>document.getElementById(idinput);
        result.push(finput.value);
    }
    return result;
}

function compileTemplate(idTemplate:string, source:string, context:object) {
    const elemTemplate:HTMLElement = document.getElementById(idTemplate);
    const template:any = Handlebars.compile(source);
    const html = template(context);
    elemTemplate.innerHTML = html;
    return elemTemplate;
}

function setButtonEvents(idButton:string, arrInputs: { input: string, value: any}[], nameHiddenErr:string) {
    const elemButton:HTMLElement = document.getElementById(idButton);
    elemButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (isValidValues(arrInputs, nameHiddenErr)) {
                const data: object = getData(arrInputs);
                console.log(data);
            }
        }
    });

    elemButton.addEventListener('click', function(e) {
        if (isValidValues(arrInputs, nameHiddenErr)) {
            const data: unknown[] = getData(arrInputs);
            console.log(data);
        }
    })
}