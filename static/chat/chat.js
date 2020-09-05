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
            { text: "Привет, ай-да на фильм?", classmes: "messagein", time: "14:39" },
            { text: "Какой?", classmes: "messagefrom", time: "15:12" },
            { text: "Крутой, про пиратов", classmes: "messagein", time: "15:38" },
            { text: "Отличный фильм, когда следующий сеанс", classmes: "messagefrom", time: "15:42" },
        ]
    },
    {
        date: "2 июля",
        message: [
            { text: "Привет, как дела?", classmes: "messagein", time: "17:38" },
            { text: "хорошо:)", classmes: "messagefrom", time: "17:38" },
        ]
    }
];

const context = { pianokeys: pianokeys, messages: messages, fimage: "../common/img/ava.png", fname: "Анастасия", errmes: "Не верно введены данные" };
compileTemplate('template-chat', context);

const arrinputs = ["inEditor"];
setValidate(arrInputs);

setButtonEvents("inEditor", arrInputs);