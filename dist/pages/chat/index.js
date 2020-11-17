/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateChat from "./chat.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
import { validateMessage } from "../../../dist/modules/validation.js";
;
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
        const inputs = [{ input: "ineditor", value: validateMessage("ineditor", nameHiddenError) }];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY2hhdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4REFBOEQ7QUFDOUQsT0FBTyxLQUFLLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkQsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxhQUFhLE1BQU0sd0NBQXdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBZ0JuRSxDQUFDO0FBSUYsTUFBTSxPQUFPLElBQUssU0FBUSxLQUFLO0lBUzNCLFlBQVksS0FBYTtRQUNyQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLE1BQU0sSUFBSSxHQUFXO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUM3QixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixPQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3BFLENBQUM7WUFDRCxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdB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