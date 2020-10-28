/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateChat from "./chat.tmpl.js";
import HTTPTransport from "../../../dist/modules/httpTransport.js";
export class Chat extends Block {
    constructor(props) {
        super("chat", props);
        //this.messages = [];
        //this.contacts = [];
        this.fimage = "";
        this.fname = "";
        this.errmes = "";
        this._getData();
        let data = {
            messages: this.messages,
            chat: this
        };
        this.proxyData = new Proxy(data, {
            get(target, prop) {
                const value = target[prop];
                console.log("get data: ", value);
                //this.render();
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                //console.log(`${prop}: ${value}`);
                //console.log(this);
                //render(".app", target.chat)
                //Chat.render();
                target.chat.render();
                target.chat.setEvents();
                return true;
            },
        });
        //this._getData();
        //console.log('super', this);
    }
    async _getData() {
        await this._getMessages();
        await this._getPianokeys();
    }
    getData() {
        let messages = [];
        let pianokeys = this.contacts;
        let fimage = this._getImage();
        let fname = this._getFName();
        let errmes = this._getErrMes();
        return { pianokeys: pianokeys, messages: messages, fimage: fimage, fname: fname, errmes: errmes };
    }
    getMes() {
        console.log(this.messages);
        return this.messages;
    }
    async _getMessages() {
        let httpTransport = new HTTPTransport;
        let res = await httpTransport.get('../../../data/messages.json');
        let resHTTP = await JSON.parse(res.response);
        this.proxyData.messages = resHTTP;
        this.messages = resHTTP;
        //console.log(resHTTP[0]);
        //return resHTTP;
    }
    async _getPianokeys() {
        let httpTransport = new HTTPTransport;
        let res = await httpTransport.get('../../../data/contacts.json');
        let resHTTP = await JSON.parse(res.response);
        this.contacts = resHTTP;
        this.proxyData.contacts = resHTTP;
        //console.log(resHTTP[0]);
        //return resHTTP;
    }
    _getImage() {
        let result = "../../../img/ava.png";
        //console.log('img', result);
        return result;
    }
    _getFName() {
        let result = "Анастасия";
        return result;
    }
    _getErrMes() {
        let result = "Пустое сообщение";
        return result;
    }
    render(context = undefined) {
        //this._getData(); //.then(console.log('ready'), console.log()).finally(console.log('finally'));
        //console.log('gdata', this.messages);
        //let context;
        //setTimeout(function() {
        if (context === undefined)
            context = this.getData();
        //console.log(context);
        let result = compileTemplate('.app', getTemplateChat(), context);
        //console.log(result);
        return result;
        //}, 300);
        //console.log('context', context);
        //let result = compileTemplate('.app', getTemplateChat(), context);
        //console.log(result);
        return result;
    }
    showChatHistory(elemContact) {
        //console.log("!!!");
        let idContact = this.getIdContact(elemContact);
        console.log(idContact);
        if (idContact !== undefined) {
            console.log('this', this);
            let history = this.getHistoryChat(idContact);
            this._updateContacts(idContact);
            let ctx = this.getData();
            ctx.messages = history;
            //elemContact.contact.classList.add("chat - wrapper__white - pianokey - pressed ");
            console.log(idContact, ctx);
            this.render(ctx);
            this.setEvents();
            //render(".app", this);
        }
    }
    _updateContacts(idContact) {
        for (let i = 0; i < this.contacts.length; i++) {
            //console.log(this.contacts[i].contact, idContact);
            if (this.contacts[i].contact.trim() == idContact.trim()) {
                this.contacts[i].pressed = "chat-wrapper__white-pianokey-pressed";
                //console.log("cont_true");
            }
            else {
                this.contacts[i].pressed = "";
                //console.log("cont_false");
            }
        }
        //console.log(this.contacts);
    }
    getIdContact(elemContact) {
        let elem = undefined;
        let result = undefined;
        if (elemContact.classList.contains("chat-wrapper__contact")) {
            elem = elemContact;
            //console.log("!");
        }
        else {
            elem = elemContact.querySelector("chat-wrapper__contact");
            if (elem == undefined)
                elem = elemContact.querySelector("chat-wrapper__contact");
        }
        // console.log(elemContact, elem);
        //console.log(elem);
        if (elem !== null)
            result = elem.textContent;
        return result;
    }
    getHistoryChat(idContact) {
        console.log('this1', this);
        for (let i = 0; i < this.messages.length; i++) {
            let elem = this.messages[i];
            //console.log("elem", elem, idContact, elem.contact, elem.contact.trim() == idContact.trim());
            if ((elem.contact != null) && (elem.contact != undefined) && (elem.contact.trim() == idContact.trim()))
                return elem.history;
        }
        return undefined;
    }
    setEvents() {
        var nameHiddenError = "chat-wrapper";
        var arrInputs = [{ input: "ineditor", value: validateMessage() }];
        var elemButton = document.getElementById("ineditor");
        elemButton.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (isValidValues(arrInputs, nameHiddenError)) {
                    var data = getData(arrInputs);
                    //console.log(data);
                }
            }
            else {
                var elementError = document.getElementById('err-ineditor7');
                if ((elementError != null) && (!elementError.classList.contains(nameHiddenError)))
                    elementError.classList.add(nameHiddenError);
            }
        });
        var elemButtonId = document.querySelector(".chat-wrapper__left-part");
        console.log(elemButtonId);
        if (elemButtonId != null) {
            console.log('click');
            elemButtonId.addEventListener('click', function (e) {
                //console.log(mainRouter, window.currentBlock);
                window.currentBlock.showChatHistory(event.target);
            });
        }
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function onFullFill(chat) {
    let context = chat.getData();
    //console.log(context);
    let result = compileTemplate('.app', getTemplateChat(), context);
    //console.log(result);
    return result;
    //console.log('onfullfill');
}
function onReject() { }
{
    //console.log('onReject');
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
//const chat = new Chat({});
/*chat._getData();
setTimeout(function() {
    let ctx = chat.getData();
    chat.render(ctx);
}, 200);*/
//render(".app", chat);
//chat.setEvents();
