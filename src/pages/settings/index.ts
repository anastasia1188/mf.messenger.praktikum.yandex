/// <reference path="../../../dist/modules/references.d.ts" />

import Block from "../../../dist/modules/block.js";
import getTemplateSettings from "./settings.tmpl.js";
import { isRegistrationSuccess } from "../../../dist/modules/autorisation.js";
import { isValidLogin, isValidEmail, isValidPassword, validateEMail, validateLogin, validatePassword, setFocus, isValidValues } from "../../../dist/modules/validation.js";

export class Settings extends Block {
    constructor(props: Object) {
        super("settings", props);
    }

    private getData() {
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
    };

    render() {
        const context = this.getData();
        return compileTemplate('.app', getTemplateSettings(), context);
    };

    setEvents() {
        const nameHiddenElement = "wrapper__errmes-hiddenerr";

        const elementEmail = document.getElementById("email");
        elementEmail.addEventListener('blur', function (e) {
            validateEMail("email", nameHiddenElement);
        });

        const elementLogin = document.getElementById("login");
        elementLogin.addEventListener('blur', function (e) {
            validateLogin("login", nameHiddenElement);
        });

        const elementPassword = document.getElementById("password");
        elementPassword.addEventListener('blur', function (e) {
            validatePassword("password", nameHiddenElement);
        });

        const elementRepeatPassword = document.getElementById("passwordr");
        elementRepeatPassword.addEventListener('blur', function (e) {
            validatePassword("passwordr", nameHiddenElement);
        });

        const inputs = [
            { input: "email", value: isValidEmail },
            { input: "login", value: isValidLogin },
            { input: "password", value: isValidPassword },
            { input: "passwordr", value: isValidPassword }
        ];

        setFocus(inputs, nameHiddenElement);
        setButtonEvents("save", inputs, nameHiddenElement);
        setFormEvent(inputs, nameHiddenElement);
    }
}

function setFormEvent(arrInputs: { input: string }[], nameHiddenElement: string) {
    const frmAutorisation = document.querySelector("#form");

    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        const user: ObjectInterface = getData(arrInputs);
        const res = isRegistrationSuccess(user);
        if (res) {
            if (isValidValues(arrInputs, nameHiddenElement))
                goNextPage(arrInputs, nameHiddenElement);
            else {
                const elementError = document.querySelector("#err-password6");
                if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
                    elementError.classList.remove(nameHiddenElement);
                }
            }
        };
    });

    const inpFile = <HTMLInputElement>document.querySelector("#newPhoto");

    inpFile.addEventListener("change", function (e) {
        const value = inpFile.files[0];
        const imgAvatar = <HTMLImageElement>document.querySelector("#avatar");
        imgAvatar.src = window.URL.createObjectURL(value);

    });
}

