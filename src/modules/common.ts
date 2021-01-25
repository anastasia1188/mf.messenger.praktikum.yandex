/// <reference path="common.d.ts" />
interface ObjectInterface {
    [key: string]: string;
}
interface Template {
    idTemplate: string,
        source: string,
        context: Object
}

interface Input {
    input: string,
    value?: Function | string
}

function getData(arrFields: { input: string, value: string }[] = []): ObjectInterface {
  const result: ObjectInterface = {};

  for (let i = 0; i < arrFields.length; i++) {
    const idinput: string = arrFields[i].input;
    const finput = <HTMLInputElement>document.getElementById(idinput);
    result[idinput] = finput.value;
  }
  return result;
}

function compileTemplate(idTemplate: string, source: string, context: object, elemDocument: HTMLDocument | HTMLElement) {
  let elemTemplate:HTMLElement;
  if (elemDocument === undefined) { elemTemplate = document.querySelector(idTemplate); } else { elemTemplate = elemDocument.querySelector(idTemplate); }

  const template: any = Handlebars.compile(source);
  const html = template(context);
  if (elemTemplate !== null) { elemTemplate.innerHTML = html; }
  return html;
}

function setButtonEvents(idButton: string, arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
  const elemButton: HTMLElement = document.getElementById(idButton);
  elemButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      goNextPage(arrInputs);
    }
  });

  elemButton.addEventListener('click', (e) => {
    goNextPage(arrInputs);
  });
}

function goNextPage(arrInputs: Input[]) {
  window.location.hash = '#chat';
}

function setFormEvents(arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
  const frmAutorisation = document.querySelector('#form');
  frmAutorisation.addEventListener('submit', (e) => {
    e.preventDefault();
    goNextPage(arrInputs);
  });
}

function deepEqual(obj1: object, obj2: object) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
