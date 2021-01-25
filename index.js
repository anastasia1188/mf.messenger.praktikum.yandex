import './sass/main.sass';
import { Login } from './dist/pages/login/index.js';
import { Registration } from './dist/pages/registration/index.js';
import { Chat } from './dist/pages/chat/index.js';
import { Settings } from './dist/pages/settings/index.js';
import router from './dist/modules/router.js';

let mainRouter = new router(".app");

function changeRoute() {
    console.log(window.location.hash);
    mainRouter.go("/" + window.location.hash);
}

mainRouter
    .use("/#login", Login)
    .use("/#registration", Registration)
    .use("/#settings", Settings)
    .use("/#chat", Chat)
    .use("/404", Chat)
    .start();


setTimeout(() => {
    mainRouter.go("/#login");
}, 1000);

window.addEventListener("hashchange", changeRoute);
window.Chat = Chat;