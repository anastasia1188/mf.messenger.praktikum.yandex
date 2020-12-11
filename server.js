const express = require("express");
const { v4 } = require("uuid");

const app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let users = [{
        "login": "anastasia1188",
        "email": "anastasia1188@mail.ru",
        "name": "Anastasia",
        "password": "kkkkkkkk9",
        "avatar": "../../../data/img/ava.png"
    },
    {
        "login": "stasy",
        "email": "anastasia1199@mail.ru",
        "name": "Anastasia",
        "password": "kkkkkkkk8",
        "avatar": "../../../data/img/ava.png"
    }
];

let chats = [
    { id: 0, "contact": "Арина", "countmes": "♪", "hidden": false, "pressed": false, "pianokey": "7si.mp3", users: ["Арина"] },
    { id: 1, "contact": "Папа ", "countmes": "♫", "hidden": false, "pressed": false, "pianokey": "6lya.mp3", users: ["Папа"] },
    { id: 2, "contact": "Мама", "countmes": "♪", "hidden": false, "pressed": false, "pianokey": "5sol.mp3", users: ["Мама"] },
    { id: 3, "contact": "Аня", "countmes": "", "hidden": "hidden=true", "pressed": false, "pianokey": "4fa.mp3", users: ["Аня"] },
    { id: 4, "contact": "Саша", "countmes": "", "hidden": "", "pressed": false, "pianokey": "3mi.mp3", users: ["Саша"] },
    { id: 5, "contact": "Коля", "countmes": "", "hidden": "", "pressed": false, "pianokey": "2re.mp3", users: ["Коля"] },
    { id: 6, "contact": "Таня", "countmes": "", "hidden": "hidden=true", "pressed": false, "pianokey": "1do.mp3", users: ["Таня"] },
    { id: 7, "contact": "Света", "countmes": "", "hidden": "", "pressed": false, "pianokey": "7si.mp3", users: ["Света"] },
    { id: 8, "contact": "Андрей", "countmes": "", "hidden": "", "pressed": false, "pianokey": "6lya.mp3", users: ["Андрей"] },
    { id: 9, "contact": "Миша", "countmes": "", "hidden": "", "pressed": false, "pianokey": "5sol.mp3", users: ["Миша"] },
    { id: 10, "contact": "Оля", "countmes": "", "hidden": "hidden=true", "pressed": false, "pianokey": "4fa.mp3", users: ["Оля"] },
    { id: 11, "contact": "Юля", "countmes": "", "hidden": "", "pressed": false, "pianokey": "3mi.mp3", users: ["Юля"] }
];

let messages = [{
        "contact": "Арина",
        "history": [{
                "date": "1 июля",
                "message": [
                    { "text": "Привет, ай-да на фильм?", "classmes": "chat-wrapper__message-in", "time": "14:39" },
                    { "text": "Какой?", "classmes": "chat-wrapper__message-from", "time": "15:12" },
                    { "text": "Крутой, про пиратов", "classmes": "chat-wrapper__message-in", "time": "15:38" },
                    { "text": "Отличный фильм, когда следующий сеанс", "classmes": "chat-wrapper__message-from", "time": "15:42" }
                ]
            },
            {
                "date": "2 июля",
                "message": [
                    { "text": "Привет, как дела?", "classmes": "chat-wrapper__message-in", "time": "17:38" },
                    { "text": "хорошо:)", "classmes": "chat-wrapper__message-from", "time": "17:38" }
                ]
            }
        ]
    },
    {
        "contact": "Папа",
        "history": [{
            "date": "7 июля",
            "message": [
                { "text": "Привет", "classmes": "chat-wrapper__message-in", "time": "14:39" },
                { "text": "Привет", "classmes": "chat-wrapper__message-from", "time": "15:12" }
            ]
        }]
    },
    {
        "contact": "Мама",
        "history": [{
            "date": "9 июля",
            "message": [
                { "text": "Привет, как дела", "classmes": "chat-wrapper__message-in", "time": "14:39" },
                { "text": "Привет, как дела", "classmes": "chat-wrapper__message-from", "time": "15:12" }
            ]
        }]
    }
]

let currentUser = undefined;

//AUTH
app.get('/auth/user', (req, res) => {
    let data = undefined;
    if (currentUser === undefined)
        status = 401
    else {
        data = users.find(user => user.login === currentUser);
        status = 200;
    }

    res.status(status).json(data);
});

app.post('/auth/signup', urlencodedParser, (req, res) => {
    const user = req.body;
    let status = 401;

    const data = users.find(elem => elem.login === user.login);
    if (data === undefined)
        status = 200;

    if (status === 200) {
        users.push(user);
        currentUser = user.login;
    }

    res.status(status).json({ message: "ready" });
});

app.post('/auth/signin', urlencodedParser, (req, res) => {
    const user = req.body;
    let status = 401;
    const data = users.find(elem => elem.login === user.login);

    if (data !== undefined) {
        status = 200;
        currentUser = user.login;
    }

    res.status(status).json({ message: "ready" });
});

app.post('/auth/logout', urlencodedParser, (req, res) => {
    res.status(200).json(users);
});

//CHATS 
app.get('/chats', (req, res) => {
    res.status(200).json(chats);
});

app.post('/chats', urlencodedParser, (req, res) => {
    const chat = req.body;
    chats.unshift({ id: v4(), ...chat });
    res.status(200).json({ message: "ready" });
});

app.delete('/chats', (req, res) => {
    const chat = req.body;
    chats = chats.filter(c => c.id !== chat.id);
    res.status(200).json({ message: "ready" });
});

app.get('/messages', (req, res) => {
    res.status(200).json(messages);
});

app.get('/chats/:id/users', (req, res) => {
    const id = req.params.id;
    const findUsers = undefined;
    const findChat = chats.find(c => c.id === id);
    if (findChat === undefined)
        status = 401;
    else {
        status = 200;
        findUsers = findChat.users;
    }

    res.status(status).json(findUsers);
});

app.get('/chats/new/:id', (req, res) => {
    const id = req.params.id;
    const unreadCount = undefined;
    const findChat = chats.find(c => c.id === id);
    if (findChat === undefined)
        status = 401;
    else {
        status = 200;
        unreadCount = findChat.countmes;
    }

    res.status(status).json(unreadCount);
});

app.put('/chats/users', (req, res) => {
    const idChat = req.body.chatId;
    const newUsers = req.body.users;

    const findChat = chats.findIndex(c => c.id === idChat);
    if (findChat === undefined)
        status = 401;
    else {
        status = 200;
        findChat[users] = newUsers;
    }

    res.status(status).json({ message: "ready" });
});

app.put('/chats/avatar', (req, res) => {
    const idChat = req.body.chatId;
    const avatar = req.body.avatar;

    const findChat = chats.findIndex(c => c.id === idChat);
    if (findChat === undefined)
        status = 401;
    else {
        status = 200;
        findChat[avatar] = avatar;
    }

    res.status(status).json({ message: "ready" });
});

app.delete('/chats/users', (req, res) => {
    const idChat = req.body.id;

    const findChat = chats.findIndex(c => c.id === idChat);
    if (findChat === undefined)
        status = 401;
    else {
        status = 200;
        findChat[users] = [];
    }

    res.status(status);
});

//USERS
app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    const findUser = users.find(c => c.id === id);
    if (findUser === undefined)
        status = 401;
    else
        status = 200;

    res.status(status).json(findUser);
});

app.get('/user/search', (req, res) => {

});

app.put('/user/profile', urlencodedParser, (req, res) => {
    const profile = req.body;
    let status;
    let findUser = users.findIndex(c => c.login === currentUser);
    if (findUser === undefined)
        status = 401;
    else {
        status = 200;
        users[findUser].name = profile.name;
        users[findUser].email = profile.email;
        users[findUser].password = profile.password;
        users[findUser].avatar = profile.avatar;
    }

    res.status(status).json({ message: "ready" });
});

app.put('/user/profile/avatar', (req, res) => {
    const avatar = req.body;

    const findUser = chats.find(c => c.login === currentUser);
    if (findUser === undefined)
        status = 401;
    else {
        status = 200;
        findUser.avatar = avatar;
    }

    res.status(status).json({ message: "ready" });
});

app.put('/user/password', (req, res) => {
    const password = req.body;

    const findUser = chats.find(c => c.login === currentUser);
    if (findUser === undefined)
        status = 401;
    else {
        status = 200;
        findUser.password = password;
    }

    res.status(status).json({ message: "ready" });
});

//---------------------------
app.use(express.static(__dirname));

/*app.use(function(req, res) {
    res.status(404);
    res.sendFile(__dirname + '/dist/pages/404/404.html');
});

app.use(function(req, res) {
    res.status(500);
    res.sendFile(__dirname + '/dist/pages/500/500.html');
});*/

app.set('port', (process.env.PORT || 4000));

//Start Server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

console.log('hi');