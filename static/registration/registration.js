const context = {
    mesReg: "Регистрация",
    mesEmail: "Почта",
    mesLogin: "Логин",
    mesPassword: "Пароль",
    mesPasswordR: "Пароль (еще раз)",
    btnReg: "Зарегистрироваться",
    errorMes0: "Не верно введены данные",
    errorMes1: "Ваш пароль должен быть не менее 8 символов",
    errorMes2: "Ваш пароль должен содержать хотя бы один литерал",
    errorMes3: "Ваш пароль должен содержать хотя бы одну цифру",
    errorMes4: "Не допускаются пробелы",
    errorMes5: "Длина должна быть не менее 5 символов",
    errorMes6: "Пароли не совпадают"
};
compileTemplate('template-registration', window.templateRegistration(), context);

const nameHiddenElement = "wrapper__errmes-hiddenerr";
const arrInputs = [
    { input: "email", func: validateEMail() },
    { input: "login", func: validateLogin() },
    { input: "password", func: validatePassword() },
    { input: "passwordr", func: validatePasswordR() }
];

for (let i = 0; i < arrInputs.length; i++)
    setValidate(arrInputs[i].input, arrInputs[i].func, nameHiddenElement);

setFocus(arrInputs, nameHiddenElement);
setButtonEvents("reg", arrInputs, nameHiddenElement);