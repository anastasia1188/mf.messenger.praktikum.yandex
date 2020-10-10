/// <reference path="../../common/references.d.ts" />
/// <reference path="../../common/regexp.d.ts" />
import Block from "../../modules/block.js";
import getTemplateSettings from "./settings.tmpl.js";

export class Settings extends Block {
    constructor(props) {
        super("settings", props);
    }

    _getData() {
        var result = {
            fimg: "../common/img/ava.png",
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
            { input: "email", func: validateEMail() },
            { input: "login", func: validateLogin() },
            { input: "password", func: validatePassword() },
            { input: "passwordr", func: validatePasswordR() }
        ];
        for (var i = 0; i < arrInputs.length; i++)
            setValidate(arrInputs[i].input, arrInputs[i].func, nameHiddenElement);
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