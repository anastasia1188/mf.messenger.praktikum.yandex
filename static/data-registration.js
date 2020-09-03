var source          = document.getElementById('template-registration').innerHTML;
var template        = Handlebars.compile(source);
var mesReg          = "Регистрация";
var mesEmail        = "Почта";
var mesLogin        = "Логин";
var mesPassword     = "Пароль";
var mesPasswordR    = "Пароль (еще раз)";
var btnReg          = "Зарегистрироваться";
var context         = { mesReg: mesReg, mesEmail: mesEmail, mesLogin: mesLogin, mesPassword: mesPassword, 
                        mesPasswordR: mesPasswordR, btnReg: btnReg };
var html            = template(context);
document.getElementById('template-registration').innerHTML = html;