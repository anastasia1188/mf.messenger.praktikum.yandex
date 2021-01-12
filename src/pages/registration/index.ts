import { goNextPage } from '../../modules/common';
import Block from '../../modules/block';
import getTemplateRegistration from './registration.tmpl';
import { isRegistrationSuccess } from '../../modules/autorization';
import {
  isValidName, validateName, isValidLogin, isValidEmail, isValidPassword,
  validateEMail, validateLogin, validatePassword, setFocus, isValidValues,
} from '../../modules/validation';
import Button from '../../components/myButton/index';
import { compileTemplate } from '../../modules/common';

const button = new Button({
  id: 'reg',
  className: 'my-button',
  mesButton: 'Зарегистрироваться',
});

interface FuncEvent {
  (): void;
}
interface Input {
    input: string,
    value: any
}

function setFormEvent(arrInputs: Input[], nameHiddenElement: string) {
  const frmAutorisation = document.querySelector('#form');
  frmAutorisation.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = getData(arrInputs);
    const res = await isRegistrationSuccess(user);

    if (res !== undefined) {
      if (isValidValues(arrInputs, nameHiddenElement)) {
        const resObj = JSON.parse(res);
        (<any>window).idUser = resObj.id;
        if (!resObj.id !== undefined) { goNextPage(arrInputs); }
      }
    } else {
      const elementError = document.querySelector('#err-password7');
      if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
        elementError.classList.remove(nameHiddenElement);
      }
    }
  });
}
export default class Registration extends Block {
  constructor(props: Record<string, any>) {
    super('registration', props);
  }

  private static getData() {
    const result = {
      mesReg: 'Регистрация',
      mesEmail: 'Почта',
      mesLogin: 'Логин',
      mesPassword: 'Пароль',
      mesPasswordR: 'Пароль (еще раз)',
      btnReg: 'Зарегистрироваться',
      errorMes0: 'Не верно введены данные',
      errorMes1: 'Ваш пароль должен быть не менее 8 символов',
      errorMes2: 'Ваш пароль должен содержать хотя бы один литерал',
      errorMes3: 'Ваш пароль должен содержать хотя бы одну цифру',
      errorMes4: 'Не допускаются пробелы',
      errorMes5: 'Длина должна быть не менее 5 символов',
      errorMes6: 'Пароли не совпадают',
    };
    return result;
  }

  render() {
    const context = Registration.getData();
    compileTemplate('.app', getTemplateRegistration(), context);
    const mainElem:HTMLElement = <HTMLElement>document.querySelector('.app');
    button.render(mainElem);

    return mainElem.innerHTML;
  }

  setEvents() {
    const nameHiddenElement = 'wrapper__errmes-hiddenerr';

    const elementEmail = document.getElementById('email');
    elementEmail.addEventListener('blur', () => {
      validateEMail('email', nameHiddenElement);
    });

    const elementLogin = document.getElementById('login');
    elementLogin.addEventListener('blur', () => {
      validateLogin('login', nameHiddenElement);
    });

    const elementName = document.getElementById('name');
    elementName.addEventListener('blur', () => {
      validateName('name', nameHiddenElement);
    });

    const elementPassword = document.getElementById('password');
    elementPassword.addEventListener('blur', () => {
      validatePassword('password', nameHiddenElement);
    });

    const elementRepeatPassword = document.getElementById('passwordr');
    elementRepeatPassword.addEventListener('blur', () => {
      validatePassword('passwordr', nameHiddenElement);
    });

    const inputs = [
      { input: 'email', value: isValidEmail },
      { input: 'login', value: isValidLogin },
      { input: 'name', value: isValidName },
      { input: 'password', value: isValidPassword },
      { input: 'passwordr', value: isValidPassword },
    ];

    setFocus(inputs, nameHiddenElement);
    setFormEvent(inputs, nameHiddenElement);
  }
}
