/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateRegistration from "./registration.tmpl.js";
import { registration } from "../../../dist/modules/autorisation.js";
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
        return compileTemplate('.app', getTemplateRegistration(), context);
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvcmVnaXN0cmF0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDtBQUM5RCxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLHVCQUF1QixNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQU1yRSxNQUFNLE9BQU8sWUFBYSxTQUFRLEtBQUs7SUFDbkMsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLE9BQU87UUFDWCxNQUFNLE1BQU0sR0FBRztZQUNYLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsTUFBTSxFQUFFLG9CQUFvQjtZQUM1QixTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLFNBQVMsRUFBRSw0Q0FBNEM7WUFDdkQsU0FBUyxFQUFFLGtEQUFrRDtZQUM3RCxTQUFTLEVBQUUsZ0RBQWdEO1lBQzNELFNBQVMsRUFBRSx3QkFBd0I7WUFDbkMsU0FBUyxFQUFFLHVDQUF1QztZQUNsRCxTQUFTLEVBQUUscUJBQXFCO1NBQ25DLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU07UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0IsT0FBTyxlQUFlLENBQUMsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUFBLENBQUM7SUFFRixTQUFTO1FBQ0wsTUFBTSxpQkFBaUIsR0FBRywyQkFBMkIsQ0FB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