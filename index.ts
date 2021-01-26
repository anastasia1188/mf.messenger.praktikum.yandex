import './sass/main.sass'
import { Login } from './src/pages/login/index';
import { Registration } from './src/pages/registration/index';
import { Chat } from './src/pages/chat/index';
import { Settings } from './src/pages/settings/index';
import router from './src/modules/router';
import { logout} from './src/modules/autorization';

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
(<any>window).Chat = Chat;