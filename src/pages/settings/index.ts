/// <reference path="../../../src/modules/references.d.ts" />

import Block from '../../modules/block';
import getTemplateSettings from './settings.tmpl';
import { saveUserData, saveAvatar, getUserData } from '../../modules/autorization';
import {
  isValidName, isValidEmail, isValidPassword, validateEMail, validateName, validatePassword, setFocus, isValidValues,
} from '../../modules/validation';
import Button from '../../components/myButton/index';

const button = new Button({
  id: 'save',
  className: 'my-button',
  mesButton: 'Сохранить',
});

interface ObjectInterface {
  [key: string]: string;
}
export class Settings extends Block {
  constructor(props: Object) {
    super('settings', props);
  }

  private async getData() {
    const dataUser = await getUserData();
    if (dataUser.avatar === null) dataUser.avatar = '../../../data/img/noava.png';
    else dataUser.avatar = `https://ya-praktikum.tech${dataUser.avatar}`;

    const result = {
      fimg: dataUser.avatar,
      fname: dataUser.first_name,
      femail: dataUser.email,
      fpassword: 'password8', // dataUser.password,
      fpasswordRepeat: 'password8', // dataUser.password,
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

  async render() {
    const context = await this.getData();
    compileTemplate('.app', getTemplateSettings(), context);
    const mainElem: HTMLElement = document.querySelector('.app');
    button.render(mainElem);

    return mainElem.innerHTML;
  }

  setEvents() {
    const nameHiddenElement = 'wrapper__errmes-hiddenerr';

    const elementEmail = document.getElementById('email');
    if (elementEmail !== null) {
      elementEmail.addEventListener('blur', (e) => {
        validateEMail('email', nameHiddenElement);
      });
    }

    const elementName = document.getElementById('name');
    if (elementName !== null) {
      elementName.addEventListener('blur', (e) => {
        validateName('name', nameHiddenElement);
      });
    }

    const elementPassword = document.getElementById('password');
    if (elementPassword !== null) {
      elementPassword.addEventListener('blur', (e) => {
        validatePassword('password', nameHiddenElement);
      });
    }

    const elementRepeatPassword = document.getElementById('passwordr');
    if (elementRepeatPassword !== null) {
      elementRepeatPassword.addEventListener('blur', (e) => {
        validatePassword('passwordr', nameHiddenElement);
      });
    }

    const inputs = [
      { input: 'email', value: isValidEmail },
      { input: 'name', value: isValidName },
      { input: 'password', value: isValidPassword },
      { input: 'passwordr', value: isValidPassword },
    ];

    setFocus(inputs, nameHiddenElement);
    // setButtonEvents("save", inputs, nameHiddenElement);
    setFormEvent(inputs, nameHiddenElement);
  }
}

function setFormEvent(arrInputs: { input: string, value: Function }[], nameHiddenElement: string) {
  const frmAutorisation = <HTMLFormElement>document.getElementById('form');

  frmAutorisation.addEventListener('submit', async (e) => {
    const imgAvatar = <HTMLImageElement>document.querySelector('#avatar');
    // console.log('imgAvatar', imgAvatar);
    e.preventDefault();
    const user: ObjectInterface = getData(arrInputs);
    const formatUser = {
      first_name: user.name,
      second_name: user.name,
      display_name: user.name,
      login: (<any>window).login,
      email: user.email,
      phone: '+79188888888',
      avatar: imgAvatar.src,
    };

    if (isValidValues(arrInputs, nameHiddenElement)) {
      user.avatar = imgAvatar.src;
      const res = saveUserData(formatUser);
      if (res) { goNextPage(arrInputs); } else {
        const elementError = document.querySelector('#err-password6');
        if ((elementError != null) && (elementError.classList.contains(nameHiddenElement))) {
          elementError.classList.remove(nameHiddenElement);
        }
      }

      const blob = await fetch(imgAvatar.src).then((r) => r.blob());
      console.log(typeof blob, blob);

      const formData = new FormData();
      formData.append('avatar', blob, imgAvatar.src);

      const resAvatar = saveAvatar(formData);
      console.log(resAvatar);
    }
  });

  const inpFile = <HTMLInputElement>document.querySelector('#newPhoto');

  inpFile.addEventListener('change', (e) => {
    const value = inpFile.files[0];
    const imgAvatar = <HTMLImageElement>document.querySelector('#avatar');
    imgAvatar.src = window.URL.createObjectURL(value);
  });
}
