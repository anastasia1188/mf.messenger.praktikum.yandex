const elemTemplate = document.getElementById('template-chat');
const source = elemTemplate.innerHTML;
const template = Handlebars.compile(source);
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

const context = { pianokeys: pianokeys, messages: messages, fimage: "img/ava.png", fname: "Анастасия" };
const html = template(context);
elemTemplate.innerHTML = html;

const arrinputs = ["email", "login", "password", "passwordr"];
setValidate(arrInputs);
const elemInEditor = document.getElementById("ineditor");
elemInEditor.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (validate(arrInputs)) {
            const data = getData(arrInputs);
            console.log(data);
        }
    }
});