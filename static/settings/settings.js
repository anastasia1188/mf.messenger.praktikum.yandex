const context = {
    fimg: "../common/img/ava.png",
    fname: "Анастасия",
    femail: "anastasia1188@mail.ru",
    flogin: "anastasia1188",
    fpassword: "********",
    fpasswordRepeat: "********",
    errmes: "Не верно введены данные",
    errmes1: "Ваш пароль должен быть не менее 8 символов",
    errmes2: "Ваш пароль должен содержать хотя бы один литерал",
    errmes3: "Ваш пароль должен содержать хотя бы одну цифру",
    errmesr: "Пароли не совпадают"
};
compileTemplate('template-settings', context);

const arrInputs = ["email", "login", "password", "passwordr"];
setValidate(arrInputs, "basic-wrapper__errmes-hiddenerr");
setFocus(arrInputs, "basic-wrapper__errmes-hiddenerr");

setButtonEvents("save", arrInputs, "basic-wrapper__errmes-hiddenerr");