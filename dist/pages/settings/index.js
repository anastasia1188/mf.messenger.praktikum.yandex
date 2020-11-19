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
    constructor(props) {
        super("settings", props);
    }
    async getData() {
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
    }
    ;
    async render() {
        const context = await this.getData();
        compileTemplate('.app', getTemplateSettings(), context);
        const mainElem = document.querySelector('.app');
        button.render(mainElem);
        return mainElem.innerHTML;
    }
    ;
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
function setFormEvent(arrInputs, nameHiddenElement) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user = getData(arrInputs);
        if (isValidValues(arrInputs, nameHiddenElement)) {
            const imgAvatar = document.querySelector("#avatar").src;
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
    const inpFile = document.querySelector("#newPhoto");
    inpFile.addEventListener("change", function (e) {
        const value = inpFile.files[0];
        const imgAvatar = document.querySelector("#avatar");
        imgAvatar.src = window.URL.createObjectURL(value);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvc2V0dGluZ3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBRTlELE9BQU8sS0FBSyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25ELE9BQU8sbUJBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDekssT0FBTyxNQUFNLE1BQU0sNENBQTRDLENBQUM7QUFFaEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDdEIsRUFBRSxFQUFFLE1BQU07SUFDVixTQUFTLEVBQUUsV0FBVztJQUN0QixTQUFTLEVBQUUsV0FBVztDQUN6QixDQUFDLENBQUM7QUFFSCxNQUFNLE9BQU8sUUFBUyxTQUFRLEtBQUs7SUFDL0IsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLEtBQUssQ0FBQyxPQUFPO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUc7WUFDWCxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDckIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ3BCLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSztZQUN0QixTQUFTLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDNUIsZUFBZSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQ2xDLFNBQVMsRUFBRSx5QkFBeUI7WUFDcEMsU0FBUyxFQUFFLDRDQUE0QztZQUN2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