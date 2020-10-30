/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/regexp.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
export class Login extends Block {
    constructor(props) {
        super("login", props);
        this.users = [];
        this.setEvents();
        //console.log("hash", window.location.hash);
    }
    _getData() {
        let result = {
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
        };
        return result;
    }
    ;
    async _getUsers() {
        let httpTransport = new HTTPTransport;
        let res = await httpTransport.get('../../data/users.json');
        let resHTTP = await JSON.parse(res.response);
        this.users = resHTTP;
    }
    isPassAutorisation(login, password) {
        this._getUsers();
        for (let i = 0; i < this.users.length; i++) {
            if ((this.users[i] === login) && (this.users[i] === login))
                return true;
        }
        return false;
    }
    render() {
        var context = this._getData();
        return compileTemplate('.app', getTemplateLogin(), context);
    }
    ;
    show() {
    }
    setEvents() {
        //console.log("hi");
        var nameHiddenElement = "wrapper__errmes-hiddenerr";
        var arrInputs = [
            { input: "login", value: validateLogin() },
            { input: "password", value: validatePassword() }
        ];
        for (var i = 0; i < arrInputs.length; i++)
            setValidate(arrInputs[i].input, arrInputs[i].value, nameHiddenElement);
        setFocus(arrInputs, nameHiddenElement);
        setButtonEvents("autorisation", arrInputs, nameHiddenElement);
        //let btnAutorisation = document.querySelector("#autorisation");
        //btnAutorisation.onclick = "console.log('kjkj')";
        //console.log('btnAutorisation', btnAutorisation);
        /*btnAutorisation.addEventListener("click", function(e) {
            //console.log("autorisation");
            window.location.hash = '#chat';
            autorisation();
        });*/
    }
    ;
    autorisation() {
        return true;
        /*let login = document.querySelector("#login").textContent;
        //console.log(login);
        let password = document.querySelector("#password").textContent;
        if (isPassAutorisation(login, password)) {
            console.log("Чат");
        }*/
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    //root.appendChild(block.getContent());
    return root;
}
;
const alogin = new Login({});
render(".app", alogin);
