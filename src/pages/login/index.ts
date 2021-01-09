import Block from '../../modules/block';
import getTemplateLogin from './login.tmpl';
import MyButton from '../../components/myButton/index';
import { isAutorizied } from '../../modules/autorization';
import { goNextPage } from '../../modules/common';

import {
  isValidLogin, isValidPassword, validateLogin, validatePassword, setFocus, isValidValues,
} from '../../modules/validation';

const button = new MyButton({
  id: 'autorisation',
  className: 'my-button',
  mesButton: 'Авторизация',
});

interface ObjectInterface {
    [key: string]: string;
}

interface Input {
    input: string,
    value: any
}

function setFormEvent(arrInputs: Input[], nameHiddenElement: string) {
  const frmAutorisation = document.querySelector('#form');

  frmAutorisation.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user: ObjectInterface = getData(arrInputs);
    const res = await isAutorizied(user);

    if (res) {
      if (isValidValues(arrInputs, nameHiddenElement)) { goNextPage(arrInputs); }
    } else {
      const elementError = document.querySelector('#err-password6');
      if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
        elementError.classList.remove(nameHiddenElement);
      }
    }
  });
}
export default class Login extends Block {
    users: [];

    constructor(props: Record<string, any>) {
      super('login', props);
      this.users = [];
      this.setEvents();
    }

    static private getData() {
      const result = {
        mesEnter: 'Вход',
        mesMail: 'Введите логин',
        mesPassword: 'Введите пароль',
        mesAutorisation: 'Авторизация',
        mesAccount: 'нет аккаунта?',
        errorMes0: 'Не верно введены данные',
        errorMes1: 'Ваш пароль должен быть не менее 8 символов',
        errorMes2: 'Ваш пароль должен содержать хотя бы один литерал',
        errorMes3: 'Ваш пароль должен содержать хотя бы одну цифру',
        errorMes4: 'Не допускаются пробелы',
        errorMes5: 'Длина должна быть не менее 5 символов',
        errorMes6: 'Неверный логин или пароль',
      };
      return result;
    }

    render() {
      const context = this.getData();
      compileTemplate('.app', getTemplateLogin(), context);
      const mainElem: HTMLElement = document.querySelector('.app');
      button.render(mainElem);

      return mainElem.innerHTML;
    }

    static setEvents() {
      const nameHiddenElement = 'wrapper__errmes-hiddenerr';

      const elementLogin = document.getElementById('login');
      elementLogin.addEventListener('blur', () => {
        validateLogin('login', nameHiddenElement);
      });

      const elementPassword = document.getElementById('password');
      elementPassword.addEventListener('blur', () => {
        validatePassword('password', nameHiddenElement);
      });

      const inputs = [
        { input: 'login', value: isValidLogin },
        { input: 'password', value: isValidPassword },
      ];

      setFocus(inputs, nameHiddenElement);
      setFormEvent(inputs, nameHiddenElement);
    }
}
