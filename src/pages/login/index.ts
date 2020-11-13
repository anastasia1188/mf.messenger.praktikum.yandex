/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/regexp.d.ts" />
/// <reference path="../../../dist/modules/common.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
import { autorisation } from "../../../dist/modules/autorisation.js";

interface ObjectInterface {
    [key: string]: string;
}
export class Login extends Block {
    users: [];
    constructor(props) {
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

    private async getUsers() {
        const httpTransport = new HTTPTransport;
        const res = await httpTransport.get('../../data/users.json');
        const resHTTP = await JSON.parse(res.response);
        this.users = resHTTP;
    }

    isPassAutorisation(login: string, password: string) {
        this.getUsers();
        for (let i = 0; i < this.users.length; i++) {
            if ((this.users[i] === login) && (this.users[i] === login))
                return true;
        }
        return false;
    }

    render() {
        const context = this.getData();
        return compileTemplate('.app', getTemplateLogin(), context);
    };

    show() {

    }

    setEvents() {
        const nameHiddenElement = "wrapper__errmes-hiddenerr";
        const inputs = [
            { input: "login", value: validateLogin() },
            { input: "password", value: validatePassword() }
        ];
        for (let i = 0; i < inputs.length; i++)
            setValidate(inputs[i].input, inputs[i].value, nameHiddenElement);
        setFocus(inputs, nameHiddenElement);
        setFormEvent(inputs, nameHiddenElement);
    };
}

function setFormEvent(arrInputs: { input: string, value: any }[], nameHiddenElement: string) {
    const frmAutorisation = document.querySelector("#form");
    
    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        const user: ObjectInterface = getData(arrInputs);
        autorisation(user);
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

function render(query, block) {
    const root = document.querySelector(query);
    return root;
};

const alogin = new Login({});

render(".app", alogin);