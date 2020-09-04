
var source = document.getElementById('template-login').innerHTML;
var template = Handlebars.compile(source);
var context = {mesEnter: "Вход", mesMail: "Введите почту", mesPassword: "Введите пароль",
mesAutorisation: "Авторизация", mesAccount: "нет аккаунта?"};
var html = template(context);
document.getElementById('template-login').innerHTML = html;
console.log(html);