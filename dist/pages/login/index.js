/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/common.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
import { isAutorizied } from "../../../dist/modules/autorisation.js";
import { isValidLogin, isValidPassword, validateLogin, validatePassword, setFocus, isValidValues } from "../../../dist/modules/validation.js";
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
    async getUsers() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvbG9naW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELDBEQUEwRDtBQUMxRCxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLGdCQUFnQixNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sYUFBYSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBSzlJLE1BQU0sT0FBTyxLQUFNLFNBQVEsS0FBSztJQUU1QixZQUFZLEtBQWE7UUFDckIsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLE9BQU87UUFDWCxNQUFNLE1BQU0sR0FBRztZQUNYLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFdBQVcsRUFBRSxnQkFBZ0I7WUFDN0IsZUFBZSxFQUFFLGFBQWE7WUFDOUIsVUFBVSxFQUFFLGVBQWU7WUFDM0IsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxTQUFTLEVBQUUsNENBQTRDO1lBQ3ZELFNBQVMsRUFBRSxrREFBa0Q7WUFDN0QsU0FBUyxFQUFFLGdEQUFnRDtZQUMzRCxTQUFTLEVBQUUsd0JBQXdCO1lBQ25DLFNBQVMsRUFBRSx1Q0FBdUM7WUFDbEQsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxDQUFBO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFBLENBQUM7SUFF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