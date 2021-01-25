const express = require("express");
const { v4 } = require("uuid");

const app = express();
var bodyParser = require('body-parser');

const ws = new require('ws');
const wss = new ws.Server({ port: 3000 });
var http = require('http');
const clients = new Set();
let id = Math.random();

var messages = [];

wss.on('connection', ws => {
    //ws.send('welcomeclient');
    console.log('welcomeserver');

    let idConnection = Math.random();
    ws.idConnection = idConnection;
    clients[id] = ws;
    clients.add(ws);

    ws.on('message', message => {
        let mes = JSON.parse(message);

        messages.push(mes);
        console.log('mes', messages);

        ws.send(JSON.stringify(mes));
        //console.log(mes);
    });
});

wss.on('message', ws => {
    ws.send(ws);
    ws.console.log(ws);
});

console.log('wss', wss);

http.createServer((req, res) => {
    // в реальном проекте здесь может также быть код для обработки отличных от websoсket-запросов
    // здесь мы работаем с каждым запросом как с веб-сокетом
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
    console.log(ws);
    clients.add('hello', ws);

    ws.on('message', function(message) {
        message = message.slice(0, 50); // максимальный размер сообщения 50
        console.log('message', message);

        for (let client of clients) {
            client.send(message);
        }
    });

    ws.on('close', function() {
        clients.delete(ws);
        console.log('close');
    });
}


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

let chats = [];

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
    let result = [];
    for (let i = 0; i < messages.length; i++) {
        //if ((messages[i].to === login) || (messages[i].from === login))
        result.push(messages[i]);
    }
    console.log('result', messages);
    res.status(200).json(JSON.stringify(messages));
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

const httphost = 'localhost';
const httpport = 3000;

/*wss.listen(httpport, httphost, () =>
    console.log(`Server listens http://${host}:${port}`)
)*/

console.log('hi');