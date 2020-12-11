/// <reference path="../../../src/modules/references.d.ts" />
/// <reference path="../../../src/modules/common.d.ts" />
import Block from '../../modules/block.js';
import getTemplateLogin from './login.tmpl.js';
import myButton from '../../components/myButton/index.js';
import { isAutorizied } from '../../modules/autorization.js';
import {
  isValidLogin, isValidPassword, validateLogin, validatePassword, setFocus, isValidValues,
} from '../../modules/validation.js';

const button = new myButton({
  id: 'autorisation',
  className: 'my-button',
  mesButton: 'Авторизация',
});
export class Login extends Block {
  constructor(props) {
    super('login', props);
    this.users = [];
    this.setEvents();
  }

  getData() {
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
    const mainElem = document.querySelector('.app');
    button.render(mainElem);
    return mainElem.innerHTML;
  }

  show() {
  }

  setEvents() {
    const nameHiddenElement = 'wrapper__errmes-hiddenerr';
    const elementLogin = document.getElementById('login');
    elementLogin.addEventListener('blur', (e) => {
      validateLogin('login', nameHiddenElement);
    });
    const elementPassword = document.getElementById('password');
    elementPassword.addEventListener('blur', (e) => {
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
function setFormEvent(arrInputs, nameHiddenElement) {
  const frmAutorisation = document.querySelector('#form');
  frmAutorisation.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = getData(arrInputs);
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
