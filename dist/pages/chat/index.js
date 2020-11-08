/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateChat from "./chat.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
export class Chat extends Block {
    constructor(props) {
        super("chat", props);
        this.fimage = "";
        this.fname = "";
        this.errmes = "";
        this.getData();
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
    async getData() {
        await this.getMessages();
        await this.getPianokeys();
    }
    getAllData() {
        let messages = [];
        const pianokeys = this.contacts;
        const fimage = this.getImage();
        const fimagesound = "../../../data/img/sound.jpg";
        let fname = this.getFName();
        let errmes = this.getErrMes();
        return { pianokeys: pianokeys, messages: messages, fimage: fimage, fimagesound: fimagesound, fname: fname, errmes: errmes };
    }
    getMes() {
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
    getFName() {
        const result = "Анастасия";
        return result;
    }
    getErrMes() {
        const result = "Пустое сообщение";
        return result;
    }
    render(context = undefined) {
        if (context === undefined)
            context = this.getAllData();
        const result = compileTemplate('.app', getTemplateChat(), context);
        return result;
    }
    showChatHistory(elemContact) {
        const idContact = this.getIdContact(elemContact);
        if (idContact !== undefined) {
            const history = this.getHistoryChat(idContact);
            this.updateContacts(idContact);
            const ctx = this.getAllData();
            ctx.messages = history;
            this.render(ctx);
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
    getIdContact(elemContact) {
        let elem = undefined;
        let result = undefined;
        if (elemContact.classList.contains("chat-wrapper__contact")) {
            elem = elemContact;
        }
        else {
            elem = elemContact.querySelector("chat-wrapper__contact");
            if (elem == undefined)
                elem = elemContact.querySelector("chat-wrapper__contact");
        }
        if (elem !== null)
            result = elem.textContent;
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
        const arrInputs = [{ input: "ineditor", value: validateMessage() }];
        const elemButton = document.getElementById("ineditor");
        elemButton.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (isValidValues(arrInputs, nameHiddenError)) {
                    let data = getData(arrInputs);
                    console.log(data);
                }
            }
            else {
                let elementError = document.getElementById('err-ineditor7');
                if (elementError && (!elementError.classList.contains(nameHiddenError)))
                    elementError.classList.add(nameHiddenError);
            }
        });
        const elemButtonId = document.querySelector(".chat-wrapper__left-part");
        if (elemButtonId != null) {
            elemButtonId.addEventListener('click', function (e) {
                window.currentBlock.showChatHistory(event.target);
            });
        }
        const elemSound = document.getElementById("sound");
        elemSound.addEventListener('click', function (e) {
            if (elemSound.src == "http://mf.messenger.praktikum.yandex/data/img/sound.jpg") {
                elemSound.src = "http://mf.messenger.praktikum.yandex/data/img/nosound.jpg";
                window.noSound = true;
            }
            else {
                elemSound.src = "http://mf.messenger.praktikum.yandex/data/img/sound.jpg";
                window.noSound = false;
            }
        });
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
