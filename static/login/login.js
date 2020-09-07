const context = {
    mesEnter: "Вход",
    mesMail: "Введите логин",
    mesPassword: "Введите пароль",
    mesAutorisation: "Авторизация",
    mesAccount: "нет аккаунта?",
    errorMes0: "Не верно введены данные",
    errorMes1: "Ваш пароль должен быть не менее 8 символов",
    errorMes2: "Ваш пароль должен содержать хотя бы один литерал",
    errorMes3: "Ваш пароль должен содержать хотя бы одну цифру",
    errorMes4: "Не допускаются пробелы",
    errorMes5: "Длина должна быть не менее 5 символов"
};
compileTemplate('template-login', window.templateLogin(), context);

const nameHiddenElement = "wrapper__errmes-hiddenerr";
const arrInputs = [
    { input: "login", func: validateLogin() },
    { input: "password", func: validatePassword() }
];

setValidate(arrInputs, nameHiddenElement);
setFocus(arrInputs, nameHiddenElement);

setButtonEvents("autorisation", arrInputs, nameHiddenElement);