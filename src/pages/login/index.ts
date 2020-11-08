/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/regexp.d.ts" />
/// <reference path="../../../dist/modules/common.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";

export class Login extends Block {
    users:[];
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
            errorMes5: "Длина должна быть не менее 5 символов"
        }
        return result;
    };

    private async getUsers() {
        const httpTransport = new HTTPTransport;
        const res = await httpTransport.get('../../data/users.json');
        const resHTTP = await JSON.parse(res.response);
        this.users = resHTTP;
    }

    isPassAutorisation(login, password) {
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
        const arrInputs = [
            { input: "login", value: validateLogin() },
            { input: "password", value: validatePassword() }
        ];
        for (let i = 0; i < arrInputs.length; i++)
            setValidate(arrInputs[i].input, arrInputs[i].value, nameHiddenElement);
        setFocus(arrInputs, nameHiddenElement);
        setFormEvents(arrInputs, nameHiddenElement);
    };
}

function render(query, block) {
    const root = document.querySelector(query);
    return root;
};

const alogin = new Login({});

render(".app", alogin);