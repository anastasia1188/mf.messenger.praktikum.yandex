const context = {
    mesReg: "Регистрация",
    mesEmail: "Почта",
    mesLogin: "Логин",
    mesPassword: "Пароль",
    mesPasswordR: "Пароль (еще раз)",
    btnReg: "Зарегистрироваться",
    errmes: "Не верно введены данные",
    errmes1: "Ваш пароль должен быть не менее 8 символов",
    errmes2: "Ваш пароль должен содержать хотя бы один литерал",
    errmes3: "Ваш пароль должен содержать хотя бы одну цифру",
    errmesr: "Пароли не совпадают"
};
compileTemplate('template-registration', context);

const arrInputs = ["email", "login", "password", "passwordr"];
setValidate(arrInputs);
setFocus(arrInputs);

setButtonEvents("reg", arrInputs);