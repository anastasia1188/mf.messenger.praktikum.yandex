/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/regexp.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateSettings from "./settings.tmpl.js";

export class Settings extends Block {
    constructor(props) {
        super("settings", props);
    }

    _getData() {
        var result = {
            fimg: "../../../img/ava.png",
            fname: "Анастасия",
            femail: "anastasia1188@mail.ru",
            flogin: "anastasia1188",
            fpassword: "kkkkkkkk9",
            fpasswordRepeat: "kkkkkkkk9",
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
        var context = this._getData();
        return compileTemplate('.app', getTemplateSettings(), context);
    };

    setEvents() {
        var nameHiddenElement = "wrapper__errmes-hiddenerr";
        var arrInputs = [
            { input: "email", value: validateEMail() },
            { input: "login", value: validateLogin() },
            { input: "password", value: validatePassword() },
            { input: "passwordr", value: validatePasswordR() }
        ];
        for (var i = 0; i < arrInputs.length; i++)
            setValidate(arrInputs[i].input, arrInputs[i].value, nameHiddenElement);
        setFocus(arrInputs, nameHiddenElement);
        setButtonEvents("save", arrInputs, nameHiddenElement);
    }
}

function render(query, block) {
    const root = document.querySelector(query);
    //root.appendChild(block.getContent());
    return root;
};


//const settings = new Settings;

//render("#template-settings", settings);
//setEvents();