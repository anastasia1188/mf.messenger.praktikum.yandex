/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/regexp.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateSettings from "./settings.tmpl.js";
import { registration } from "../../../dist/modules/autorisation.js";
export class Settings extends Block {
    constructor(props) {
        super("settings", props);
    }
    getData() {
        const result = {
            fimg: "../../../data/img/ava.png",
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
    }
    ;
    render() {
        const context = this.getData();
        return compileTemplate('.app', getTemplateSettings(), context);
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
        setButtonEvents("save", inputs, nameHiddenElement);
        setFormEvent(inputs, nameHiddenElement);
    }
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
    const inpFile = document.querySelector("#newPhoto");
    //console.log(inpFile, inpFile.value);
    inpFile.addEventListener("change", function (e) {
        //console.log(inpFile, inpFile.value);
        const value = inpFile.files[0];
        const imgAvatar = document.querySelector("#avatar");
        imgAvatar.src = window.URL.createObjectURL(value);
        console.log(e, imgAvatar.src);
        //alert( imgAvatar.src );
    });
}
function render(query) {
    const root = document.querySelector(query);
    return root;
}
;
