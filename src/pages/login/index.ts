/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/common.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import myButton from "../../dist/components/myButton/index.js";
import { isAutorizied } from "../../../dist/modules/autorization.js";
import { isValidLogin, isValidPassword, validateLogin, validatePassword, setFocus, isValidValues } from "../../../dist/modules/validation.js";
import Button from "../../../dist/components/myButton/index.js";

const button = new Button({
    id: 'autorisation',
    className: 'my-button',
    mesButton: 'Авторизация',
});

interface ObjectInterface {
    [key: string]: string;
}
export class Login extends Block {
    users: [];
    constructor(props: Object) {
        super("login", props);
        this.users = [];
        this.setEvents();
    }

    private getData() {
        const result = {
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
            errorMes5: "Длина должна быть не менее 5 символов",
            errorMes6: "Неверный логин или пароль"
        }
        return result;
    };
   
    render() {
        const context = this.getData();
        compileTemplate('.app', getTemplateLogin(), context);
        const mainElem = document.querySelector('.app');
        button.render(mainElem);
        
        return mainElem.innerHTML;
    };

    show() {

    }

    setEvents() {
        const nameHiddenElement = "wrapper__errmes-hiddenerr";

        const elementLogin = document.getElementById("login");
        elementLogin.addEventListener('blur', function (e) {
            validateLogin("login", nameHiddenElement);
        });

        const elementPassword = document.getElementById("password");
        elementPassword.addEventListener('blur', function (e) {
            validatePassword("password", nameHiddenElement);
        });

        const inputs = [
            { input: "login", value: isValidLogin },
            { input: "password", value: isValidPassword }
        ];

        setFocus(inputs, nameHiddenElement);
        setFormEvent(inputs, nameHiddenElement);
    };
}

function setFormEvent(arrInputs: { input: string }[], nameHiddenElement: string) {
    const frmAutorisation = document.querySelector("#form");

    frmAutorisation.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user: ObjectInterface = getData(arrInputs);
        const res = await isAutorizied(user);

        if (res) {
            if (isValidValues(arrInputs, nameHiddenElement))
                goNextPage(arrInputs, nameHiddenElement);
        } else {
            const elementError = document.querySelector("#err-password6");
            if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
                elementError.classList.remove(nameHiddenElement);
            }
        }
    });
}
