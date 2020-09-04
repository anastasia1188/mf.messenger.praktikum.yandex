const elemTemplate = document.getElementById('template-500');
const source = elemTemplate.innerHTML;
const template = Handlebars.compile(source);
const context = { errmes: "Мы уже фиксим", errcode: "500" };
const html = template(context);
elemTemplate.innerHTML = html;