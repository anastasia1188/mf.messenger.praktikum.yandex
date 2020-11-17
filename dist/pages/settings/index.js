/// <reference path="../../../dist/modules/references.d.ts" />
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
    inpFile.addEventListener("change", function (e) {
        const value = inpFile.files[0];
        const imgAvatar = document.querySelector("#avatar");
        imgAvatar.src = window.URL.createObjectURL(value);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvc2V0dGluZ3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBRTlELE9BQU8sS0FBSyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25ELE9BQU8sbUJBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXJFLE1BQU0sT0FBTyxRQUFTLFNBQVEsS0FBSztJQUMvQixZQUFZLEtBQWE7UUFDckIsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sT0FBTztRQUNYLE1BQU0sTUFBTSxHQUFHO1lBQ1gsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxLQUFLLEVBQUUsV0FBVztZQUNsQixNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLGVBQWUsRUFBRSxXQUFXO1lBQzVCLFNBQVMsRUFBRSx5QkFBeUI7WUFDcEMsU0FBUyxFQUFFLDRDQUE0QztZQUN2RCxTQUFTLEVBQUUsa0RBQWtEO1lBQzdELFNBQVMsRUFBRSxnREFBZ0Q7WUFDM0QsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxTQUFTLEVBQUUsdUNBQXVDO1lBQ2xELFNBQVMsRUFBRSxxQkFBcUI7U0FDbkMsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFBQSxDQUFDO0lBRUYsTUFBTTtRQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixPQUFPLGVBQWUsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQUEsQ0FBQztJQUVGLFNBQVM7UUFDTCxNQUFNLGlCQUFpQixHQUFHLDJCQUEyQixDQUFDO1FB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