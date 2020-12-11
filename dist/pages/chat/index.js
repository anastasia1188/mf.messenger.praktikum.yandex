/// <reference path="../../../src/modules/references.d.ts" />
import Block from '../../modules/block.js';
import getTemplateChat from './chat.tmpl.js';
import { isValidMessage } from '../../modules/validation.js';
import {
  getChats, getMessages, getUserData, addChatToList, deleteChatFromList,
} from '../../modules/autorization.js';

export class Chat extends Block {
  constructor(props) {
    super('chat', props);
    this.fileImage = '';
    this.name = '';
    this.errorMessage = '';
    this.getFileData();
    const data = {
      messages: this.messages,
      chat: this,
    };
    this.proxyData = new Proxy(data, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      async set(target, prop, value) {
        target[prop] = value;
        await target.chat.render();
        // target.chat.setEvents();
        return true;
      },
    });
  }

  async getFileData() {
    this.messages = await getMessages();
    this.contacts = await getChats();
    const userData = await getUserData();
    window.login = userData.login;
    this.name = userData.first_name;
    this.fileImage = userData.avatar;
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

  async render(context = undefined) {
    if (context === undefined) {
      await this.getFileData();
      context = this.getAllData();
    }
    const result = compileTemplate('.app', getTemplateChat(), context);
    return result;
  }

  async showChatHistory(elementContact) {
    const idContact = this.getIdContact(elementContact);
    if (idContact !== undefined) {
      const history = this.getHistoryChat(idContact);
      this.updateContacts(idContact);
      const context = this.getAllData();
      context.messages = history;
      await this.render(context);
      this.setEvents();
    }
  }

  updateContacts(idContact) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].contact.trim() == idContact.trim()) {
        this.contacts[i].pressed = 'chat-wrapper__white-pianokey-pressed';
        if (!window.noSound) {
          const sound = new Audio(`../../../data/sounds/${this.contacts[i].pianokey}`);
          sound.play();
        }
      } else {
        this.contacts[i].pressed = '';
      }
    }
  }

  getIdContact(elementContact) {
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

  getHistoryChat(idContact) {
    for (let i = 0; i < this.messages.length; i++) {
      const elem = this.messages[i];
      if ((elem.contact != null) && (elem.contact != undefined) && (elem.contact.trim() == idContact.trim())) { return elem.history; }
    }
    return undefined;
  }

  setEvents() {
    const nameHiddenError = 'chat-wrapper';
    const inputs = [{ input: 'ineditor', value: isValidMessage }];
    const button = document.getElementById('ineditor');
    if (button !== null) {
      button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (isValidValues(inputs, nameHiddenError)) {
            const data = getData(inputs);
            console.log(data);
          }
        } else {
          const elementError = document.getElementById('err-ineditor7');
          if (elementError && (!elementError.classList.contains(nameHiddenError))) { elementError.classList.add(nameHiddenError); }
        }
      });
    }

    const elementButtonId = document.querySelector('.chat-wrapper__left-part');
    if (elementButtonId != null) {
      elementButtonId.addEventListener('click', (e) => {
        window.currentBlock.showChatHistory(event.target);
      });
    }
    const elementSound = document.getElementById('sound');
    if (elementSound != null) {
      elementSound.addEventListener('click', (e) => {
        if (elementSound.src == 'http://mf.messenger.praktikum.yandex/data/img/sound.jpg') {
          elementSound.src = 'http://mf.messenger.praktikum.yandex/data/img/nosound.jpg';
          window.noSound = true;
        } else {
          elementSound.src = 'http://mf.messenger.praktikum.yandex/data/img/sound.jpg';
          window.noSound = false;
        }
      });
    }

    const elementAddChat = document.querySelector('#add');
    if (elementAddChat != null) { elementAddChat.addEventListener('click', (e) => { addChat(); }); }
    const elementDeleteChat = document.querySelector('#delete');
    if (elementDeleteChat != null) { elementDeleteChat.addEventListener('click', (e) => { deleteChat(); }); }
  }
}
async function addChat() {
  const elementSearch = document.querySelector('#search');
  const { value } = elementSearch;
  if (value === '') { alert('Укажите имя чата'); } else {
    const curChat = window.currentBlock;
    addChatToList({
      contact: value, countmes: '', hidden: false, pressed: false, pianokey: '7si.mp3',
    });
    await curChat.render();
    curChat.setEvents();
  }
}
async function deleteChat() {
  const curChat = window.currentBlock;
  const idContact = getCurrentContact(curChat.contacts);
  deleteChatFromList(curChat.contacts[idContact]);
  await curChat.render();
  curChat.setEvents();
}
function getCurrentContact(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].pressed) { return i; }
  }
  return -1;
}
