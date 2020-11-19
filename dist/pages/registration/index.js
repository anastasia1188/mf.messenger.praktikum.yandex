/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateRegistration from "./registration.tmpl.js";
import { isRegistrationSuccess } from "../../../dist/modules/autorization.js";
import { isValidLogin, isValidEmail, isValidPassword, validateEMail, validateLogin, validatePassword, setFocus, isValidValues } from "../../../dist/modules/validation.js";
import Button from "../../../dist/components/myButton/index.js";
const button = new Button({
    id: 'reg',
    className: 'my-button',
    mesButton: 'Зарегистрироваться',
});
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
        compileTemplate('.app', getTemplateRegistration(), context);
        const mainElem = document.querySelector('.app');
        button.render(mainElem);
        return mainElem.innerHTML;
    }
    ;
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
        setFormEvent(inputs, nameHiddenElement);
    }
    ;
}
function setFormEvent(arrInputs, nameHiddenElement) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user = getData(arrInputs);
        const res = await isRegistrationSuccess(user);
        console.log(res);
        if (res) {
            if (isValidValues(arrInputs, nameHiddenElement))
                goNextPage(arrInputs, nameHiddenElement);
        }
        else {
            const elementError = document.querySelector("#err-password7");
            if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
                elementError.classList.remove(nameHiddenElement);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvcmVnaXN0cmF0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDtBQUM5RCxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLHVCQUF1QixNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzSyxPQUFPLE1BQU0sTUFBTSw0Q0FBNEMsQ0FBQztBQUVoRSxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUN0QixFQUFFLEVBQUUsS0FBSztJQUNULFNBQVMsRUFBRSxXQUFXO0lBQ3RCLFNBQVMsRUFBRSxvQkFBb0I7Q0FDbEMsQ0FBQyxDQUFDO0FBTUgsTUFBTSxPQUFPLFlBQWEsU0FBUSxLQUFLO0lBQ25DLFlBQVksS0FBYTtRQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxPQUFPO1FBQ1gsTUFBTSxNQUFNLEdBQUc7WUFDWCxNQUFNLEVBQUUsYUFBYTtZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsT0FBTztZQUNqQixXQUFXLEVBQUUsUUFBUTtZQUNyQixZQUFZLEVBQUUsa0JBQWtCO1lBQ2hDLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxTQUFTLEVBQUUsNENBQTRDO1lBQ3ZELFNBQVMsRUFBRSxrREFBa0Q7WUFDN0QsU0FBUyxFQUFFLGdEQUFnRDtZQUMzRCxTQUFTLEVBQUUsd0JBQXdCO1lBQ25DLFNBQVMsRUFB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