/// <reference path="../../../dist/modules/references.d.ts" />

import Block from "../../../dist/modules/block.js";
import getTemplateSettings from "./settings.tmpl.js";
import { saveUserData, getUserData } from "../../../dist/modules/autorization.js";
import { isValidName, isValidEmail, isValidPassword, validateEMail, validateName, validatePassword, setFocus, isValidValues } from "../../../dist/modules/validation.js";
import Button from "../../../dist/components/myButton/index.js";

const button = new Button({
    id: 'save',
    className: 'my-button',
    mesButton: 'Сохранить',
});

export class Settings extends Block {
    constructor(props: Object) {
        super("settings", props);
    }

    private async getData() {
        const dataUser = await getUserData();
        const result = {
            fimg: dataUser.avatar,
            fname: dataUser.name,
            femail: dataUser.email,
            fpassword: dataUser.password,
            fpasswordRepeat: dataUser.password,
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

     async render() {
        const context = await this.getData();
        compileTemplate('.app', getTemplateSettings(), context);
        const mainElem = document.querySelector('.app');
        button.render(mainElem);

        return mainElem.innerHTML;
    };

    setEvents() {
        const nameHiddenElement = "wrapper__errmes-hiddenerr";

        const elementEmail = document.getElementById("email");
        if (elementEmail !== null)
            elementEmail.addEventListener('blur', function (e) {
                validateEMail("email", nameHiddenElement);
            });

        const elementName = document.getElementById("name");
        if (elementName !== null)
        elementName.addEventListener('blur', function (e) {
                validateName("name", nameHiddenElement);
            });

        const elementPassword = document.getElementById("password");
        if (elementPassword !== null)
            elementPassword.addEventListener('blur', function (e) {
                validatePassword("password", nameHiddenElement);
            });

        const elementRepeatPassword = document.getElementById("passwordr");
        if (elementRepeatPassword !== null)
            elementRepeatPassword.addEventListener('blur', function (e) {
                validatePassword("passwordr", nameHiddenElement);
            });

        const inputs = [
            { input: "email", value: isValidEmail },
            { input: "name", value: isValidName },
            { input: "password", value: isValidPassword },
            { input: "passwordr", value: isValidPassword }
        ];

        setFocus(inputs, nameHiddenElement);
        //setButtonEvents("save", inputs, nameHiddenElement);
        setFormEvent(inputs, nameHiddenElement);
    }
}

function setFormEvent(arrInputs: { input: string }[], nameHiddenElement: string) {
    const frmAutorisation = document.querySelector("#form");

    frmAutorisation.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user: Object = getData(arrInputs);

        if (isValidValues(arrInputs, nameHiddenElement)) {
            const imgAvatar = <HTMLImageElement>document.querySelector("#avatar").src;
            user.avatar = imgAvatar;
            const res = await saveUserData(user);
            if (res)
                goNextPage(arrInputs, nameHiddenElement);
            else {
                const elementError = document.querySelector("#err-password6");
                if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
                    elementError.classList.remove(nameHiddenElement);
                }
            }
        }
    });

    const inpFile = <HTMLInputElement>document.querySelector("#newPhoto");

    inpFile.addEventListener("change", function (e) {
        const value = inpFile.files[0];
        const imgAvatar = <HTMLImageElement>document.querySelector("#avatar");
        imgAvatar.src = window.URL.createObjectURL(value);

    });
}

