/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/regexp.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateRegistration from "./registration.tmpl.js";
export class Registration extends Block {
    constructor(props) {
        super("registration", props);
    }
    getData() {
        const result = {
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
    }
    ;
    render() {
        const context = this.getData();
        return compileTemplate('.app', getTemplateRegistration(), context);
    }
    ;
    setEvents() {
        const nameHiddenElement = "wrapper__errmes-hiddenerr";
        const arrInputs = [
            { input: "email", value: validateEMail() },
            { input: "login", value: validateLogin() },
            { input: "password", value: validatePassword() },
            { input: "passwordr", value: validatePassword() }
        ];
        for (let i = 0; i < arrInputs.length; i++)
            setValidate(arrInputs[i].input, arrInputs[i].value, nameHiddenElement);
        setFocus(arrInputs, nameHiddenElement);
        setFormEvents(arrInputs, nameHiddenElement);
    }
    ;
}
function render(query) {
    const root = document.querySelector(query);
    return root;
}
;
