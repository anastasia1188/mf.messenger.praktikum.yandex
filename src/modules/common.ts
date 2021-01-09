/// <reference path="common.d.ts" />
fffjj111 = 0;
interface ObjectInterface {
  [key: string]: string;
}

interface FuncEvent {
  (idInput: string, nameHiddenError: string): void;
}
interface Template {
  idTemplate: string,
  source: string,
  context: Record<string, any>
}

interface Input {
  input: string,
  value?: FuncEvent | string
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

function compileTemplate(idTemplate: string, source: string, context:
  Record<string, any>, elemDocument: HTMLDocument | HTMLElement) {
  let elemTemplate: HTMLElement;
  if (elemDocument === undefined) {
    elemTemplate = document.querySelector(idTemplate);
  } else {
    elemTemplate = elemDocument.querySelector(idTemplate);
  }

  const template: any = Handlebars.compile(source);
  const html = template(context);
  if (elemTemplate !== null) { elemTemplate.innerHTML = html; }
  return html;
}

function goNextPage(arrInputs: Input[]) {
  window.location.hash = '#chat';
}

function setButtonEvents(idButton: string, arrInputs:
   { input: string, value: any }[], nameHiddenErr: string) {
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

function setFormEvents(arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
  const frmAutorisation = document.querySelector('#form');
  frmAutorisation.addEventListener('submit', (e) => {
    e.preventDefault();
    goNextPage(arrInputs);
  });
}

function deepEqual(obj1: Record<string, any>, obj2: Record<string, any>) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
