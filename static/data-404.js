
var source = document.getElementById('template-404').innerHTML;
var template = Handlebars.compile(source);
var context = {errmes: "Не туда попали", errcode: "404"};
var html = template(context);
document.getElementById('template-404').innerHTML = html;
console.log(html);