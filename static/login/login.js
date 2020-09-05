const context = {
    mesEnter: "Вход",
    mesMail: "Введите почту",
    mesPassword: "Введите пароль",
    mesAutorisation: "Авторизация",
    mesAccount: "нет аккаунта?"
};
compileTemplate('template-login', context);

const arrInputs = ["email", "password"];
setValidate(arrInputs);

setButtonEvents("autorisation", arrInputs);