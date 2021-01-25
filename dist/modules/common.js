/// <reference path="common.d.ts" />
function getData(arrFields = []) {
  const result = {};
  for (let i = 0; i < arrFields.length; i++) {
    const idinput = arrFields[i].input;
    const finput = document.getElementById(idinput);
    result[idinput] = finput.value;
  }
  return result;
}
function compileTemplate(idTemplate, source, context, elemDocument) {
  let elemTemplate;
  if (elemDocument === undefined) { elemTemplate = document.querySelector(idTemplate); } else { elemTemplate = elemDocument.querySelector(idTemplate); }
  const template = Handlebars.compile(source);
  const html = template(context);
  if (elemTemplate !== null) { elemTemplate.innerHTML = html; }
  return html;
}
function setButtonEvents(idButton, arrInputs, nameHiddenErr) {
  const elemButton = document.getElementById(idButton);
  elemButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      goNextPage(arrInputs);
    }
  });
  elemButton.addEventListener('click', (e) => {
    goNextPage(arrInputs);
  });
}
function goNextPage(arrInputs) {
  window.location.hash = '#chat';
}
function setFormEvents(arrInputs, nameHiddenErr) {
  const frmAutorisation = document.querySelector('#form');
  frmAutorisation.addEventListener('submit', (e) => {
    e.preventDefault();
    goNextPage(arrInputs);
  });
}
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
