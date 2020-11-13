const express = require("express");

const app = express();

app.use(express.static(__dirname));

app.use(function(req, res) {
    res.status(404);
    res.sendFile(__dirname + '/pages/404.html');
});

app.use(function(req, res) {
    res.status(500);
    res.sendFile(__dirname + '/pages/500.html');
});

app.listen(3000);