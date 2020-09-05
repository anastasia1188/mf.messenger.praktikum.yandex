const context = {
    mesEnter: "Вход",
    mesMail: "Введите почту",
    mesPassword: "Введите пароль",
    mesAutorisation: "Авторизация",
    mesAccount: "нет аккаунта?",
    errmes: "Не верно введены данные",
    errmes1: "Ваш пароль должен быть не менее 8 символов",
    errmes2: "Ваш пароль должен содержать хотя бы один литерал",
    errmes3: "Ваш пароль должен содержать хотя бы одну цифру"
};
compileTemplate('template-login', context);

const arrInputs = ["login", "password"];
setValidate(arrInputs);
setFocus(arrInputs);

setButtonEvents("autorisation", arrInputs);