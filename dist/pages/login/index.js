/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="../../../dist/modules/common.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateLogin from "./login.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
import { autorisation } from "../../../dist/modules/autorisation.js";
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
    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        const user = getData(arrInputs);
        autorisation(user);
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvbG9naW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELDBEQUEwRDtBQUMxRCxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLGdCQUFnQixNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sYUFBYSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUtyRSxNQUFNLE9BQU8sS0FBTSxTQUFRLEtBQUs7SUFFNUIsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxPQUFPO1FBQ1gsTUFBTSxNQUFNLEdBQUc7WUFDWCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsZUFBZTtZQUN4QixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLGVBQWUsRUFBRSxhQUFhO1lBQzlCLFVBQVUsRUFBRSxlQUFlO1lBQzNCLFNBQVMsRUFBRSx5QkFBeUI7WUFDcEMsU0FBUyxFQUFFLDRDQUE0QztZQUN2RCxTQUFTLEVBQUUsa0RBQWtEO1lBQzdELFNBQVMsRUFBRSxnREFBZ0Q7WUFDM0QsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxTQUFTLEVBQUUsdUNBQXVDO1lBQ2xELFNBQVMsRUFBRSwyQkFBMkI7U0FDekMsQ0FBQTtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFBQSxDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVE7UUFDbEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxhQUFhLENBQUMsR0FBRyxD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