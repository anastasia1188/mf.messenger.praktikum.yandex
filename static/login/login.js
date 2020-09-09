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
compileTemplate('template-login', getTemplateLogin(), context);

const nameHiddenElement = "wrapper__errmes-hiddenerr";
const arrInputs = [
    { input: "login", func: validateLogin() },
    { input: "password", func: validatePassword() }
];

for (let i = 0; i < arrInputs.length; i++)
    setValidate(arrInputs[i].input, arrInputs[i].func, nameHiddenElement);

setFocus(arrInputs, nameHiddenElement);

setButtonEvents("autorisation", arrInputs, nameHiddenElement);