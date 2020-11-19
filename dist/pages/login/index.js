/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/common.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import { isAutorizied } from "../../../dist/modules/autorization.js";
import { isValidLogin, isValidPassword, validateLogin, validatePassword, setFocus, isValidValues } from "../../../dist/modules/validation.js";
import Button from "../../../dist/components/myButton/index.js";
const button = new Button({
    id: 'autorisation',
    className: 'my-button',
    mesButton: 'Авторизация',
});
export class Login extends Block {
    constructor(props) {
        super("login", props);
        this.users = [];
        this.setEvents();
    }
    getData() {
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
        };
        return result;
    }
    ;
    render() {
        const context = this.getData();
        compileTemplate('.app', getTemplateLogin(), context);
        const mainElem = document.querySelector('.app');
        button.render(mainElem);
        return mainElem.innerHTML;
    }
    ;
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
    }
    ;
}
function setFormEvent(arrInputs, nameHiddenElement) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user = getData(arrInputs);
        const res = await isAutorizied(user);
        if (res) {
            if (isValidValues(arrInputs, nameHiddenElement))
                goNextPage(arrInputs, nameHiddenElement);
        }
        else {
            const elementError = document.querySelector("#err-password6");
            if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
                elementError.classList.remove(nameHiddenElement);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvbG9naW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELDBEQUEwRDtBQUMxRCxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLGdCQUFnQixNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlJLE9BQU8sTUFBTSxNQUFNLDRDQUE0QyxDQUFDO0FBRWhFLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ3RCLEVBQUUsRUFBRSxjQUFjO0lBQ2xCLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLFNBQVMsRUFBRSxhQUFhO0NBQzNCLENBQUMsQ0FBQztBQUtILE1BQU0sT0FBTyxLQUFNLFNBQVEsS0FBSztJQUU1QixZQUFZLEtBQWE7UUFDckIsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLE9BQU87UUFDWCxNQUFNLE1BQU0sR0FBRztZQUNYLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFdBQVcsRUFBRSxnQkFBZ0I7WUFDN0IsZUFBZSxFQUFFLGFBQWE7WUFDOUIsVUFBVSxFQUFFLGVBQWU7WUFDM0IsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxTQUFTLEVBQUUsNENBQTRDO1lBQ3ZELFNBQVMsRUFBRSxrREFBa0Q7WUFDN0QsU0FBUyxFQUFFLGdEQUFnRDtZQUMzRCxTQUFT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