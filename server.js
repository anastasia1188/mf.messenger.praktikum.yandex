const express = require("express");
 
const app = express();
 
app.use(express.static("static"));
app.use(express.static("static/404"));
app.use(express.static("static/500"));
app.use(express.static("static/login"));
app.use(express.static("static/registration"));
app.use(express.static("static/settings"));
app.use(express.static("static/chat"));
 
app.use("/", function(request, response){
     
    response.send("<h1>Главная страница</h1>");
});
 
app.listen(3000);