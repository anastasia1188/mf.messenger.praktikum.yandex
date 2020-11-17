/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateChat from "./chat.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY2hhdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4REFBOEQ7QUFDOUQsT0FBTyxLQUFLLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkQsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxhQUFhLE1BQU0sd0NBQXdDLENBQUM7QUFnQmxFLENBQUM7QUFJRixNQUFNLE9BQU8sSUFBSyxTQUFRLEtBQUs7SUFTM0IsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsTUFBTSxJQUFJLEdBQVc7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDcEUsQ0FBQztZQUNELEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUs7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFB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