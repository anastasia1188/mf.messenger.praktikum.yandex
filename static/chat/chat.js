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

const nameHiddenError = "chat-wrapper__errmes-hiddenerr";
const context = { pianokeys: pianokeys, messages: messages, fimage: "../common/img/ava.png", fname: "Анастасия", errmes: "Пустое сообщение" };
compileTemplate('template-chat', window.templateChat(), context);

const arrInputs = [{ input: "ineditor", func: validateMessage() }];

const elemButton = document.getElementById("ineditor");
elemButton.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (isValidValues(arrInputs, nameHiddenError)) {
            const data = getData(arrInputs);
            console.log(data);
        }
    } else {
        let elementError = document.getElementById('err-ineditor7');

        if ((elementError != null) && (!elementError.classList.contains(nameHiddenError)))
            elementError.classList.add(nameHiddenError);
    }

});