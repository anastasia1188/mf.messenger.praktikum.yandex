const context = {
    mesReg: "Регистрация",
    mesEmail: "Почта",
    mesLogin: "Логин",
    mesPassword: "Пароль",
    mesPasswordR: "Пароль (еще раз)",
    btnReg: "Зарегистрироваться"
};
compileTemplate('template-registration', context);

const arrInputs = ["email", "login", "password", "passwordr"];
setValidate(arrInputs);

setButtonEvents("reg", arrInputs);