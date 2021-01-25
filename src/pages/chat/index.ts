/// <reference path="../../../src/modules/references.d.ts" />
import Block from '../../modules/block';
import getTemplateChat from './chat.tmpl';
import { isValidMessage, isValidValues } from '../../modules/validation';
import {
  getChats, getMessages, getUserData, addChatToList, deleteChatFromList, logout,
} from '../../modules/autorization';

const socket = new WebSocket('ws://localhost:3000/');
let curLogin;

interface MesType {
  classmes: string;
  date: unknown;
  contact: string,
  history: any[],
  from: string,
  to: string,
  time: string
}

type Mes = MesType[];

// console.log('window', window);

interface Contact {
  contact: string,
  pressed: string,
  pianokey: string
}

interface Target {
  messages: Mes,
  chat: Chat
}

type strElement = string | null | undefined;

export class Chat extends Block {
  messages: Mes;

  contacts: Contact[];

  fileImage: string;

  fileImageSound: string;

  name: string;

  errorMessage: string;

  proxyData: any;

  constructor(props: Object) {
    super('chat', props);
    this.fileImage = '';
    this.name = '';
    this.errorMessage = '';
    this.getFileData();

    const data: Target = {
      messages: this.messages,
      chat: this,
    };
    this.proxyData = new Proxy(data, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        target.chat.render();
        // target.chat.setEvents();
        return true;
      },
    });
  }

  private async getFileData() {
    const userData = await getUserData();
    (<any>window).login = userData.login;
    curLogin = userData.login;
    // console.log("log", userData.login);
    this.name = userData.first_name;

    const messages = await getMessages();
    const newMes = this.prepareMessages(JSON.parse(messages));
    this.messages = newMes;

    const chats = await getChats();
    const preparedChats = this.prepareChats(chats);
    this.contacts = preparedChats;
    // console.log('contacts', preparedChats);

    // console.log('avatar', userData.avatar);
    if (userData.avatar === null) this.fileImage = '../../../data/img/noava.png';
    else this.fileImage = `https://ya-praktikum.tech${userData.avatar}`;
  }

  prepareMessages(mes) {
    // console.log('hi');
    const dates = new Set();
    const cont = new Set();
    // console.log((window.login, window);
    for (let i = 0; i < mes.length; i++) {
      // console.log("!!!", this.messages[i], curLogin);
      if ((mes[i].from === curLogin) || (mes[i].to === curLogin)) {
        dates.add(mes[i].date);
        if ((mes[i].from !== curLogin) && (mes[i].from !== undefined)) cont.add(mes[i].from.trim());
        if ((mes[i].to !== curLogin) && (mes[i].to !== undefined)) cont.add(mes[i].to.trim());
      }
      if (mes[i].from !== undefined) mes[i].from = mes[i].from.trim();
      if (mes[i].to !== undefined) mes[i].to = mes[i].to.trim();
    }

    // console.log(cont);
    // console.log(dates);

    const result = [];

    for (const valueCont of cont) {
      const decContact = { contact: valueCont, history: [] };

      for (const value of dates) {
        const decDate = { date: value, message: [] };
        const dateMes = [];
        const history = [];
        console.log('mes', mes);
        for (let i = 0; i < mes.length; i++) {
          // console.log('init', valueCont, value, curLogin);
          if ((mes[i].from === curLogin.trim()) || (mes[i].to === curLogin.trim())) {
            console.log('init1');
            if ((mes[i].from === valueCont) || (mes[i].to === valueCont)) {
              console.log('init2');
              if (mes[i].date === value) {
                console.log('init3');
                if (mes[i].from.trim() === curLogin.trim()) mes[i].classmes = 'chat-wrapper__message-from';

                if (mes[i].to.trim() === curLogin.trim()) mes[i].classmes = 'chat-wrapper__message-in';

                dateMes.push(mes[i]);
              }
            }
            decDate.message = dateMes;
          }
        }
        history.push(decDate);
        decContact.history = history;
      }

      result.push(decContact);
    }

    console.log('resultmes', result);
    return result;
  }

  prepareChats(chats) {
    // console.log('chats', chats);
    const result = [];

    for (let i = 0; i < chats.length; i++) {
      const contact = {
        id: 0,
        contact: '',
        countmes: '',
        hidden: 'false',
        pressed: false,
        pianokey: '',
        users: [],
      };

      contact.id = chats[i].id;
      contact.contact = chats[i].title;
      let ind = i;
      if (i > 7) ind = i % 7;

      // console.log('ind', ind);
      if ((ind === 2) || (ind === 6)) contact.hidden = 'hidden=true';

      ind += 1;
      contact.pianokey = `${ind}.mp3`;
      result.push(contact);
    }
    result.reverse();

    return result;
  }

  getAllData() {
    const fileAdd = '../../../data/img/add.jpg';
    const fileDelete = '../../../data/img/delete.jpg';
    const fileImageSound = '../../../data/img/sound.jpg';
    const { name } = this;
    const errorMessage = 'Пустое сообщение';
    return {
      pianoKeys: this.contacts,
      messages: this.messages,
      fileImage: this.fileImage,
      fileImageSound,
      name,
      errorMessage,
      fileAdd,
      fileDelete,
    };
  }

  getChatMessages() {
    return this.messages;
  }

  async render(context: Object | undefined = undefined) {
    // console.log("render");
    if (context === undefined) {
      await this.getFileData();
      context = this.getAllData();
    }

    const result = compileTemplate('.app', getTemplateChat(), context);

    return result;
  }

  async showChatHistory(elementContact: HTMLElement) {
    // console.log('elemContact', elementContact);
    const idContact: strElement = this.getIdContact(elementContact);
    if (idContact !== undefined) {
      const history = this.getHistoryChat(idContact);
      this.updateContacts(idContact);
      const context = this.getAllData();
      context.messages = history;
      await this.render(context);
      this.setEvents();
    }
  }

  private updateContacts(idContact: strElement) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].contact.trim() == idContact.trim()) {
        this.contacts[i].pressed = 'chat-wrapper__white-pianokey-pressed';
        if (!(<any>window).noSound) {
          const sound = new Audio(`../../../data/sounds/${this.contacts[i].pianokey}`);
          sound.play();
        }
      } else {
        this.contacts[i].pressed = '';
      }
    }
  }

  getIdContact(elementContact: HTMLElement): strElement {
    let element;
    let result;

    if (elementContact.classList.contains('chat-wrapper__contact')) {
      element = elementContact;
    } else {
      element = elementContact.querySelector('chat-wrapper__contact');
      if (element == undefined) { element = elementContact.querySelector('chat-wrapper__contact'); }
    }

    if (element !== null) { result = element.textContent; }

    return result;
  }

  getHistoryChat(idContact: strElement): Mes | undefined {
    for (let i = 0; i < this.messages.length; i++) {
      const elem = this.messages[i];
      if ((elem.contact != null) && (elem.contact != undefined) && (elem.contact.trim() == idContact.trim())) { return elem.history; }
    }

    return undefined;
  }

  setEvents() {
    const nameHiddenError = 'chat-wrapper';
    const inputs = [{ input: 'ineditor', value: isValidMessage }];
    const button = <HTMLElement>document.getElementById('ineditor');

    if (button !== null) {
      button.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
          if (isValidValues(inputs, nameHiddenError)) {
            const data = getData(inputs);
            // console.log(data);
            const idContact: strElement = this.getIdContact((<any>window).currentKey);
            const now = new Date();
            const message = {
              from: (<any>window).login,
              to: idContact,
              text: data.ineditor,
              date: `${now.getFullYear()} ${getNameMonth(now.getMonth())} ${now.getDate()}`,
              time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
              classmes: 'chat-wrapper__message-from',
            };
            // console.log('message', message);

            socket.send(JSON.stringify(message));
            const elemEditor = document.querySelector('#ineditor');
            elemEditor.textContent = '';
            const messages = await getMessages();
            const newMes = this.prepareMessages(JSON.parse(messages));
            this.messages = newMes;
            await this.render();
            console.log('curContact', (<any>window).curContact);
            (<any>window).currentBlock.showChatHistory(e.target);
            this.setEvents();
            (<any>window).curContact.click();
          }
        } else {
          const elementError = document.getElementById('err-ineditor7');
          if (elementError && (!elementError.classList.contains(nameHiddenError))) { elementError.classList.add(nameHiddenError); }
        }
      });
    }
    const elementButtonId = document.querySelector('.chat-wrapper__left-part');

    if (elementButtonId != null) {
      elementButtonId.addEventListener('click',
        (e) => {
          // console.log('key');
          (<any>window).curContact = e.target;
          (<any>window).currentBlock.showChatHistory(e.target);
          (<any>window).currentKey = e.target;
        });
    }
    const elementSound = <HTMLImageElement>document.getElementById('sound');
    if (elementSound != null) {
      elementSound.addEventListener('click', (e) => {
        if (elementSound.src == 'http://mf.messenger.praktikum.yandex/data/img/sound.jpg') {
          elementSound.src = 'http://mf.messenger.praktikum.yandex/data/img/nosound.jpg';
          (<any>window).noSound = true;
        } else {
          elementSound.src = 'http://mf.messenger.praktikum.yandex/data/img/sound.jpg';
          (<any>window).noSound = false;
        }
      });
    }

    const elementAddChat = <HTMLElement>document.querySelector('#add');
    if (elementAddChat != null) { elementAddChat.addEventListener('click', (e) => { addChat(); }); }
    const elementDeleteChat = <HTMLElement>document.querySelector('#delete');
    if (elementDeleteChat != null) { elementDeleteChat.addEventListener('click', (e) => { deleteChat(); }); }
  }

  static async exit() {
    await logout();
    // console.log('curLogin', (<any>window).curLogin);
    (<any>window).curLogin = undefined;
  }
}

async function addChat() {
  const elementSearch = <HTMLInputElement>document.querySelector('#search');
  const { value } = elementSearch;
  // console.log("!");
  if (value === '') { alert('Укажите имя чата'); } else {
    // console.log("!!!");
    const curChat = (<any>window).currentBlock;
    await addChatToList({
      title: value, contact: value, countmes: '', hidden: false, pressed: false, pianokey: '7si.mp3',
    });
    await curChat.render();
    curChat.setEvents();
  }
}

async function deleteChat() {
  const curChat = (<any>window).currentBlock;
  const idContact = getCurrentContact(curChat.contacts);
  const idChat = { chatId: curChat.contacts[idContact].id };
  // console.log('idChat', idChat);
  await deleteChatFromList(idChat);
  await curChat.render();
  curChat.setEvents();
}

function getCurrentContact(contacts: Contact[]) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].pressed) { return i; }
  }

  return -1;
}

function getNameMonth(numMonth) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return monthNames[numMonth];
}

socket.onmessage = function (message) {
  const newMes = JSON.parse(message.data);
  if (newMes.to === (<any>window).login) console.log('mesevent', newMes);
};
