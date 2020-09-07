const express = require("express");

const app = express();

app.use(express.static("static"));

app.use("/", function(request, response) {

    response.send(__dirname + '/index.html');
});

app.listen(3000);