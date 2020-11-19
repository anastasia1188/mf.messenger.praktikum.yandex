/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import getTemplateChat from "./chat.tmpl.js";
import { isValidMessage } from "../../../dist/modules/validation.js";
import { getChats, getMessages } from "../../../dist/modules/autorization.js";
import { getUserData, addChatToList, deleteChatFromList } from "../../modules/autorization.js";
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
            async set(target, prop, value) {
                target[prop] = value;
                await target.chat.render();
                //target.chat.setEvents();
                return true;
            },
        });
    }
    async getFileData() {
        this.messages = await getMessages();
        this.contacts = await getChats();
        const userData = await getUserData();
        this.name = userData.name;
        this.fileImage = userData.avatar;
    }
    getAllData() {
        const fileAdd = "../../../data/img/add.jpg";
        const fileDelete = "../../../data/img/delete.jpg";
        const fileImageSound = "../../../data/img/sound.jpg";
        let name = this.name;
        let errorMessage = "Пустое сообщение";
        return {
            pianoKeys: this.contacts, messages: this.messages, fileImage: this.fileImage, fileImageSound: fileImageSound, name: name,
            errorMessage: errorMessage, fileAdd: fileAdd, fileDelete: fileDelete
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
        const inputs = [{ input: "ineditor", value: isValidMessage }];
        const button = document.getElementById("ineditor");
        if (button !== null) {
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
        }
        ;
        const elementButtonId = document.querySelector(".chat-wrapper__left-part");
        if (elementButtonId != null) {
            elementButtonId.addEventListener('click', function (e) {
                window.currentBlock.showChatHistory(event.target);
            });
        }
        const elementSound = document.getElementById("sound");
        if (elementSound != null) {
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
        }
        ;
        const elementAddChat = document.querySelector("#add");
        if (elementAddChat != null)
            elementAddChat.addEventListener('click', function (e) { addChat(); });
        const elementDeleteChat = document.querySelector("#delete");
        if (elementDeleteChat != null)
            elementDeleteChat.addEventListener('click', function (e) { deleteChat(); });
    }
}
async function addChat() {
    const elementSearch = document.querySelector("#search");
    const value = elementSearch.value;
    if (value === "")
        alert("Укажите имя чата");
    else {
        const curChat = window.currentBlock;
        addChatToList({ "contact": value, "countmes": "", "hidden": false, "pressed": false, "pianokey": "7si.mp3" });
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
        if (contacts[i].pressed)
            return i;
    }
    return -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY2hhdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4REFBOEQ7QUFDOUQsT0FBTyxLQUFLLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkQsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWdCOUYsQ0FBQztBQUlGLE1BQU0sT0FBTyxJQUFLLFNBQVEsS0FBSztJQVMzQixZQUFZLEtBQWE7UUFDckIsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixNQUFNLElBQUksR0FBVztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDN0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNwRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUs7Z0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDM0IsMEJBQTBCO2dCQUMxQixPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNPLEtBQUssQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVO1FBQ04sTUFBTSxPQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDNUMsTUFBTSxVQUFVLEdBQUcsOEJBQThCLENBQUM7UUFDbEQsTUFBTSxjQUFjLEdBQUcsNkJBQTZCLENBQUM7UUFDckQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUNwQixJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUN0QyxPQUFPO1lBQ0gsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSTtZQUN4SCxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVU7U0FDdkUsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQThCLFNBQVM7UUFDaEQsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDL0I7UUFFRCxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRW5FLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLGNBQTJCO1FBQzdDLE1BQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEUsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDM0IsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsU0FBcUI7UUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxzQ0FBc0MsQ0FBQztnQkFDbEUsSUFBSSxDQUFPLE1BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDaEI7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDakM7U0FDSjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsY0FBMkI7UUFDcEMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUV2QixJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDNUQsT0FBTyxHQUFHLGNBQWMsQ0FBQztTQUM1QjthQUFNO1lBQ0gsT0FBTyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNoRSxJQUFJLE9BQU8sSUFBSSxTQUFTO2dCQUNwQixPQUFPLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBSSxPQUFPLEtBQUssSUFBSTtZQUNoQixNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUVqQyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQXFCO1FBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDM0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztRQUNMLE1BQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUM5RCxNQUFNLE1BQU0sR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVoRSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDakIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7b0JBQ25CLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsRUFBRTt3QkFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNyQjtpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ25FLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNuRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFBQSxDQUFDO1FBQ0YsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRTNFLElBQUksZUFBZSxJQUFJLElBQUksRUFBRTtZQUV6QixlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUNwQyxVQUFVLENBQUM7Z0JBQ0QsTUFBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FDSixDQUFDO1NBQ0w7UUFDRCxNQUFNLFlBQVksR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDdEIsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7Z0JBQzlDLElBQUksWUFBWSxDQUFDLEdBQUcsSUFBSSx5REFBeUQsRUFBRTtvQkFDL0UsWUFBWSxDQUFDLEdBQUcsR0FBRywyREFBMkQsQ0FBQztvQkFDekUsTUFBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2hDO3FCQUNJO29CQUNELFlBQVksQ0FBQyxHQUFHLEdBQUcseURBQXlELENBQUM7b0JBQ3ZFLE1BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUNqQztZQUNMLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFBQSxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsSUFBSSxjQUFjLElBQUksSUFBSTtZQUN0QixjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxpQkFBaUIsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RSxJQUFJLGlCQUFpQixJQUFJLElBQUk7WUFDekIsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNKO0FBRUQsS0FBSyxVQUFVLE9BQU87SUFDbEIsTUFBTSxhQUFhLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUUsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNsQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ1osS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUE7U0FDeEI7UUFDRCxNQUFNLE9BQU8sR0FBUyxNQUFPLENBQUMsWUFBWSxDQUFDO1FBQzNDLGFBQWEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDOUcsTUFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3ZCO0FBQ0wsQ0FBQztBQUVELEtBQUssVUFBVSxVQUFVO0lBQ3JCLE1BQU0sT0FBTyxHQUFTLE1BQU8sQ0FBQyxZQUFZLENBQUM7SUFDM0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoRCxNQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsUUFBbUI7SUFFMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUNuQixPQUFPLENBQUMsQ0FBQztLQUNoQjtJQUVELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDIn0=