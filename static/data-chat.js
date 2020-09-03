
var source = document.getElementById('template-chat').innerHTML;
var template = Handlebars.compile(source);
var pianokeys = [
{ contact: "Арина", countmes: "♪", hidden: "" },
{ contact: "Папа", countmes: "♫", hidden: ""},
{ contact: "Солнышко", countmes: "♪", hidden: ""},
{ contact: "", countmes: "", hidden: "hidden=true"},
{ contact: "", countmes: "", hidden: ""},
{ contact: "", countmes: "", hidden: ""},
{ contact: "", countmes: "", hidden: "hidden=true"},
{ contact: "", countmes: "", hidden: ""},
{ contact: "", countmes: "", hidden: ""},
{ contact: "", countmes: "", hidden: ""},
{ contact: "", countmes: "", hidden: "hidden=true"},
{ contact: "", countmes: "", hidden: ""}];

var messages = [
    { date: "1 июля", message: [
        {text: "Привет, ай-да на фильм?", classmes: "messagein", time: "14:39"}, 
        {text: "Какой?", classmes: "messagefrom", time: "15:12"},
        {text: "Крутой, про пиратов", classmes: "messagein", time: "15:38"},
        {text: "Отличный фильм, когда следующий сеанс", classmes: "messagefrom", time: "15:42"},
    ] },
    { date: "2 июля", 
      message: [
        {text: "Привет, как дела?", classmes: "messagein", time: "17:38"},
        {text: "хорошо:)", classmes: "messagefrom", time: "17:38"},
      ] }];

var context = { pianokeys: pianokeys, messages: messages, fimage: "img/ава.jpg", fname: "Анастасия"};

;
var html = template(context);
document.getElementById('template-chat').innerHTML = html;
console.log(html);