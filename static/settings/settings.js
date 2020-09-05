const context = {
    fimg: "../common/img/ava.png",
    fname: "Анастасия",
    femail: "anastasia1188@mail.ru",
    flogin: "anastasia1188",
    fpassword: "********",
    fpasswordRepeat: "********"
};
compileTemplate('template-settings', context);

const arrInputs = ["email", "login", "password", "passwordr"];
setValidate(arrInputs);

setButtonEvents("save", arrInputs);