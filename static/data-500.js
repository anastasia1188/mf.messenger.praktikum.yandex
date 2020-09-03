
var source = document.getElementById('template-500').innerHTML;
var template = Handlebars.compile(source);
var context = {errmes: "Мы уже фиксим", errcode: "500"};
var html = template(context);
document.getElementById('template-500').innerHTML = html;
console.log(html);