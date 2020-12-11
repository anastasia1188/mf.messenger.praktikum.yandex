/// <reference path="../../../src/modules/references.d.ts" />
import Block from "../../modules/block";
import getTemplateChat from "./chat.tmpl";
import { isValidMessage } from "../../modules/validation";
import { getChats, getMessages } from "../../modules/autorization";
import { getUserData, addChatToList, deleteChatFromList } from "../../modules/autorization";

interface Message {
    contact: string,
    history: any[]
}

interface Contact {
    contact: string,
    pressed: string,
    pianokey: string
}

interface Target {
    messages: Message[],
    chat: Chat
};

type strElement = string | null | undefined;

export class Chat extends Block {
    messages: Message[];
    contacts: Contact[];
    fileImage: string;
    fileImageSound: string;
    name: string;
    errorMessage: string;
    proxyData: any;

    constructor(props: Object) {
        super("chat", props);
        this.fileImage = "";
        this.name = "";
        this.errorMessage = "";
        this.getFileData();

        const data: Target = {
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
                //target.chat.setEvents();
                return true;
            },
        });
    }
    private async getFileData() {
        this.messages = await getMessages();
        this.contacts = await getChats();
        const userData = await getUserData();
        (<any>window).login = userData.login;
        this.name = userData.first_name;
        this.fileImage = userData.avatar;
    }

    getAllData() {
        const fileAdd = "../../../data/img/add.jpg";
        const fileDelete = "../../../data/img/delete.jpg";
        const fileImageSound = "../../../data/img/sound.jpg";
        let name = this.name
        let errorMessage = "Пустое сообщение";
        return {
            pianoKeys: this.contacts, messages: this.messages, fileImage: this.fileImage, fileImageSound: fileImageSound, name: name,
            errorMessage: errorMessage, fileAdd: fileAdd, fileDelete: fileDelete
        };
    }

    getChatMessages() {
        return this.messages;
    }

    async render(context: Object | undefined = undefined) {
        if (context === undefined) {
            await this.getFileData();
            context = this.getAllData();
        }

        const result = compileTemplate('.app', getTemplateChat(), context);

        return result;
    }

    async showChatHistory(elementContact: HTMLElement) {
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
                this.contacts[i].pressed = "chat-wrapper__white-pianokey-pressed";
                if (!(<any>window).noSound) {
                    let sound = new Audio('../../../data/sounds/' + this.contacts[i].pianokey);
                    sound.play();
                }
            } else {
                this.contacts[i].pressed = "";
            }
        }
    }

    getIdContact(elementContact: HTMLElement): strElement {
        let element = undefined;
        let result = undefined;

        if (elementContact.classList.contains("chat-wrapper__contact")) {
            element = elementContact;
        } else {
            element = elementContact.querySelector("chat-wrapper__contact");
            if (element == undefined)
                element = elementContact.querySelector("chat-wrapper__contact");
        }

        if (element !== null)
            result = element.textContent;

        return result;
    }

    getHistoryChat(idContact: strElement): Message[] | undefined {
        for (let i = 0; i < this.messages.length; i++) {
            let elem = this.messages[i];
            if ((elem.contact != null) && (elem.contact != undefined) && (elem.contact.trim() == idContact.trim()))
                return elem.history;
        }

        return undefined;
    }

    setEvents() {
        const nameHiddenError = "chat-wrapper";
        const inputs = [{ input: "ineditor", value: isValidMessage }];
        const button = <HTMLElement>document.getElementById("ineditor");
        
        if (button !== null) {
            button.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    if (isValidValues(inputs, nameHiddenError)) {
                        let data = getData(inputs);
                        console.log(data);
                    }
                } else {
                    let elementError = document.getElementById('err-ineditor7');
                    if (elementError && (!elementError.classList.contains(nameHiddenError)))
                        elementError.classList.add(nameHiddenError);
                }
            });
        };
        const elementButtonId = document.querySelector(".chat-wrapper__left-part");

        if (elementButtonId != null) {

            elementButtonId.addEventListener('click',
                function (e) {
                    (<any>window).currentBlock.showChatHistory(event.target);
                }
            );
        }
        const elementSound = <HTMLImageElement>document.getElementById("sound");
        if (elementSound != null) {
            elementSound.addEventListener('click', function (e) {
                if (elementSound.src == "http://mf.messenger.praktikum.yandex/data/img/sound.jpg") {
                    elementSound.src = "http://mf.messenger.praktikum.yandex/data/img/nosound.jpg";
                    (<any>window).noSound = true;
                }
                else {
                    elementSound.src = "http://mf.messenger.praktikum.yandex/data/img/sound.jpg";
                    (<any>window).noSound = false;
                }
            })
        };

        const elementAddChat = <HTMLElement>document.querySelector("#add");
        if (elementAddChat != null)
            elementAddChat.addEventListener('click', function (e) { addChat() });
        const elementDeleteChat = <HTMLElement>document.querySelector("#delete");
        if (elementDeleteChat != null)
            elementDeleteChat.addEventListener('click', function (e) { deleteChat() });
    }
}

async function addChat() {
    const elementSearch = <HTMLInputElement>document.querySelector("#search");
    const value = elementSearch.value;
    if (value === "")
        alert("Укажите имя чата")
    else {
        const curChat = (<any>window).currentBlock;
        addChatToList({ "contact": value, "countmes": "", "hidden": false, "pressed": false, "pianokey": "7si.mp3" });
        await curChat.render();
        curChat.setEvents();
    }
}

async function deleteChat() {
    const curChat = (<any>window).currentBlock;
    const idContact = getCurrentContact(curChat.contacts);
    deleteChatFromList(curChat.contacts[idContact]);
    await curChat.render();
    curChat.setEvents();
}

function getCurrentContact(contacts: Contact[]) {

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].pressed)
            return i;
    }

    return -1;
}

