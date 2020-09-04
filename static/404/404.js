const elemTemplate = document.getElementById('template-404');
const source = elemTemplate.innerHTML;
const template = Handlebars.compile(source);
const context = { errmes: "Не туда попали", errcode: "404" };
const html = template(context);
elemTemplate.innerHTML = html;