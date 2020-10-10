import { Login } from './components/login/index.js';
import { Registration } from './components/registration/index.js';
import { Chat } from './components/chat/index.js';
import { Settings } from './components/settings/index.js';
import router from './modules/router.js';

let mainRouter = new router(".app");
//let login = new Login();
//login.setEvents();
let exports = {};

function changeRoute() {
    console.log(window.location.hash);
    mainRouter.go("/" + window.location.hash);
}

//console.log('hash', window.location.hash);
mainRouter
    .use("/#login", Login)
    .use("/#registration", Registration)
    .use("/#settings", Settings)
    .use("/#chat", Chat)
    .use("/404", Chat)
    .start();


setTimeout(() => {
    //console.log("main");
    mainRouter.go("/#login");
}, 1000);

window.addEventListener("hashchange", changeRoute);