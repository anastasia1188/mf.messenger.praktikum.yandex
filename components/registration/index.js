/// <reference path="../../common/references.d.ts" />
/// <reference path="../../common/regexp.d.ts" />
import Block from "../../modules/block.js";
import getTemplateRegistration from "./registration.tmpl.js";

export class Registration extends Block {
    constructor(props) {
        super("registration", props);
    }

    _getData() {
        var result = {
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
        return result;
    };

    render() {
        //console.log("!test");
        var context = this._getData();
        return compileTemplate('.app', getTemplateRegistration(), context);
    };

    setEvents() {
        var nameHiddenElement = "wrapper__errmes-hiddenerr";
        var arrInputs = [
            { input: "email", func: validateEMail() },
            { input: "login", func: validateLogin() },
            { input: "password", func: validatePassword() },
            { input: "passwordr", func: validatePasswordR() }
        ];
        for (var i = 0; i < arrInputs.length; i++)
            setValidate(arrInputs[i].input, arrInputs[i].func, nameHiddenElement);
        setFocus(arrInputs, nameHiddenElement);
        setButtonEvents("reg", arrInputs, nameHiddenElement);
    };
}

function render(query, block) {
    const root = document.querySelector(query);
    //root.appendChild(block.getContent());
    return root;
};

//const registration = new Registration;

//render(".app", registration);
//setEvents();