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
        const inputs = [
            { input: "email", value: validateEMail() },
            { input: "login", value: validateLogin() },
            { input: "password", value: validatePassword() },
            { input: "passwordr", value: validatePassword() }
        ];
        for (let i = 0; i < inputs.length; i++)
            setValidate(inputs[i].input, inputs[i].value, nameHiddenElement);
        setFocus(inputs, nameHiddenElement);
        setFormEvent(inputs, nameHiddenElement);
    }
    ;
}
function setFormEvent(arrInputs, nameHiddenElement) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        const user = getData(arrInputs);
        registration(user);
        setTimeout(function () {
            if (user.result)
                goNextPage(arrInputs, nameHiddenElement);
            else {
                const elementError = document.querySelector("#err-password6");
                if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
                    elementError.classList.remove(nameHiddenElement);
                }
            }
        }, 1000);
    });
}
function render(query) {
    const root = document.querySelector(query);
    return root;
}
;
