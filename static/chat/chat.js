const pianokeys = [
    { contact: "Арина", countmes: "♪", hidden: "" },
    { contact: "Папа", countmes: "♫", hidden: "" },
    { contact: "Солнышко", countmes: "♪", hidden: "" },
    { contact: "", countmes: "", hidden: "hidden=true" },
    { contact: "", countmes: "", hidden: "" },
    { contact: "", countmes: "", hidden: "" },
    { contact: "", countmes: "", hidden: "hidden=true" },
    { contact: "", countmes: "", hidden: "" },
    { contact: "", countmes: "", hidden: "" },
    { contact: "", countmes: "", hidden: "" },
    { contact: "", countmes: "", hidden: "hidden=true" },
    { contact: "", countmes: "", hidden: "" }
];

const messages = [{
        date: "1 июля",
        message: [
            { text: "Привет, ай-да на фильм?", classmes: "chat-wrapper__message-in", time: "14:39" },
            { text: "Какой?", classmes: "chat-wrapper__message-from", time: "15:12" },
            { text: "Крутой, про пиратов", classmes: "chat-wrapper__message-in", time: "15:38" },
            { text: "Отличный фильм, когда следующий сеанс", classmes: "chat-wrapper__message-from", time: "15:42" },
        ]
    },
    {
        date: "2 июля",
        message: [
            { text: "Привет, как дела?", classmes: "chat-wrapper__message-in", time: "17:38" },
            { text: "хорошо:)", classmes: "chat-wrapper__message-from", time: "17:38" },
        ]
    }
];

const context = { pianokeys: pianokeys, messages: messages, fimage: "../common/img/ava.png", fname: "Анастасия", errmes: "Не верно введены данные" };
compileTemplate('template-chat', context);

const arrInputs = ["ineditor"];
setValidate(arrInputs, "chat-wrapper__errmes-hiddenerr");

setButtonEvents("ineditor", arrInputs, "chat-wrapper__errmes-hiddenerr");