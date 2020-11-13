/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateChat from "./chat.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
export class Chat extends Block {
    constructor(props) {
        super("chat", props);
        this.fileImage = "";
        this.name = "";
        this.errorMessage = "";
        this.getFileData();
        const data = {
            messages: this.messages,
            chat: this
        };
        this.proxyData = new Proxy(data, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                target.chat.render();
                target.chat.setEvents();
                return true;
            },
        });
    }
    async getFileData() {
        await this.getMessages();
        await this.getPianokeys();
    }
    getAllData() {
        let messages = [];
        const pianoKeys = this.contacts;
        const fileImage = this.getImage();
        const fileAdd = "../../../data/img/add.jpg";
        const fileDelete = "../../../data/img/delete.jpg";
        const fileImageSound = "../../../data/img/sound.jpg";
        let name = this.getName();
        let errorMessage = this.getErrorMessage();
        return { pianoKeys: pianoKeys, messages: messages, fileImage: fileImage, fileImageSound: fileImageSound, name: name,
            errorMessage: errorMessage, fileAdd: fileAdd, fileDelete: fileDelete };
    }
    getChatMessages() {
        return this.messages;
    }
    async getMessages() {
        const httpTransport = new HTTPTransport;
        const res = await httpTransport.get('../../../data/messages.json');
        const resHTTP = await JSON.parse(res.response);
        this.proxyData.messages = resHTTP;
        this.messages = resHTTP;
    }
    async getPianokeys() {
        const httpTransport = new HTTPTransport;
        const res = await httpTransport.get('../../../data/contacts.json');
        const resHTTP = await JSON.parse(res.response);
        this.contacts = resHTTP;
        this.proxyData.contacts = resHTTP;
    }
    getImage() {
        const result = "../../../data/img/ava.png";
        return result;
    }
    getName() {
        const result = "Анастасия";
        return result;
    }
    getErrorMessage() {
        const result = "Пустое сообщение";
        return result;
    }
    render(context = undefined) {
        if (context === undefined)
            context = this.getAllData();
        const result = compileTemplate('.app', getTemplateChat(), context);
        return result;
    }
    showChatHistory(elementContact) {
        const idContact = this.getIdContact(elementContact);
        if (idContact !== undefined) {
            const history = this.getHistoryChat(idContact);
            this.updateContacts(idContact);
            const context = this.getAllData();
            context.messages = history;
            this.render(context);
            this.setEvents();
        }
    }
    updateContacts(idContact) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].contact.trim() == idContact.trim()) {
                this.contacts[i].pressed = "chat-wrapper__white-pianokey-pressed";
                if (!window.noSound) {
                    let sound = new Audio('../../../data/sounds/' + this.contacts[i].pianokey);
                    sound.play();
                }
            }
            else {
                this.contacts[i].pressed = "";
            }
        }
    }
    getIdContact(elementContact) {
        let element = undefined;
        let result = undefined;
        if (elementContact.classList.contains("chat-wrapper__contact")) {
            element = elementContact;
        }
        else {
            element = elementContact.querySelector("chat-wrapper__contact");
            if (element == undefined)
                element = elementContact.querySelector("chat-wrapper__contact");
        }
        if (element !== null)
            result = element.textContent;
        return result;
    }
    getHistoryChat(idContact) {
        for (let i = 0; i < this.messages.length; i++) {
            let elem = this.messages[i];
            if ((elem.contact != null) && (elem.contact != undefined) && (elem.contact.trim() == idContact.trim()))
                return elem.history;
        }
        return undefined;
    }
    setEvents() {
        const nameHiddenError = "chat-wrapper";
        const inputs = [{ input: "ineditor", value: validateMessage() }];
        const button = document.getElementById("ineditor");
        button.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (isValidValues(inputs, nameHiddenError)) {
                    let data = getData(inputs);
                    console.log(data);
                }
            }
            else {
                let elementError = document.getElementById('err-ineditor7');
                if (elementError && (!elementError.classList.contains(nameHiddenError)))
                    elementError.classList.add(nameHiddenError);
            }
        });
        const elementButtonId = document.querySelector(".chat-wrapper__left-part");
        if (elementButtonId != null) {
            elementButtonId.addEventListener('click', function (e) {
                window.currentBlock.showChatHistory(event.target);
            });
        }
        const elementSound = document.getElementById("sound");
        elementSound.addEventListener('click', function (e) {
            if (elementSound.src == "http://mf.messenger.praktikum.yandex/data/img/sound.jpg") {
                elementSound.src = "http://mf.messenger.praktikum.yandex/data/img/nosound.jpg";
                window.noSound = true;
            }
            else {
                elementSound.src = "http://mf.messenger.praktikum.yandex/data/img/sound.jpg";
                window.noSound = false;
            }
        });
        const elementAddChat = document.querySelector("#add");
        elementAddChat.addEventListener('click', function (e) { addChat(); });
        const elementDeleteChat = document.querySelector("#delete");
        elementDeleteChat.addEventListener('click', function (e) { deleteChat(); });
    }
}
function addChat() {
    const elementSearch = document.querySelector("#search");
    const value = elementSearch.value;
    if (value === "")
        alert("Укажите имя чата");
    else {
        const curChat = window.currentBlock;
        curChat.contacts.unshift({ "contact": value, "countmes": "", "hidden": false, "pressed": false, "pianokey": "7si.mp3" });
        curChat.render();
        curChat.setEvents();
    }
}
function deleteChat() {
    const curChat = window.currentBlock;
    const idContact = getCurrentContact(curChat.contacts);
    curChat.contacts.splice(idContact, 1);
    curChat.render();
    curChat.setEvents();
}
function getCurrentContact(contacts) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].pressed)
            return i;
    }
    return -1;
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
