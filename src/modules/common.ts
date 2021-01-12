/// <reference path="common.d.ts" />

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

export function getData(arrFields: { input: string, value: string }[] = []): ObjectInterface {
  const result: ObjectInterface = {};

  for (let i = 0; i < arrFields.length; i++) {
    const idinput: string = arrFields[i].input;
    const finput = <HTMLInputElement>document.getElementById(idinput);
    result[idinput] = finput.value;
  }
  return result;
}

export function compileTemplate(idTemplate: string, source: string, context: Record<string, any>, 
  elemDocument?: HTMLDocument | HTMLElement) {
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

export function goNextPage(arrInputs: Input[]) {
  window.location.hash = '#chat';
}

export function setButtonEvents(idButton: string, arrInputs:
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

export function setFormEvents(arrInputs: { input: string, value: any }[], nameHiddenErr: string) {
  const frmAutorisation = document.querySelector('#form');
  frmAutorisation.addEventListener('submit', (e) => {
    e.preventDefault();
    goNextPage(arrInputs);
  });
}

export default function deepEqual(obj1: Record<string, any>, obj2: Record<string, any>) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
