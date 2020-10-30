"use strict";

var _index = require("./dist/components/login/index.js");

var _index2 = require("./dist/components/registration/index.js");

var _index3 = require("./dist/components/chat/index.js");

var _index4 = require("./dist/components/settings/index.js");

var _router = _interopRequireDefault(require("./dist/modules/router.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mainRouter = new _router["default"](".app"); //let login = new Login();
//login.setEvents();

var _exports = {};

function changeRoute() {
  console.log(window.location.hash);
  mainRouter.go("/" + window.location.hash);
} //console.log('hash', window.location.hash);


mainRouter.use("/#login", _index.Login).use("/#registration", _index2.Registration).use("/#settings", _index4.Settings).use("/#chat", _index3.Chat).use("/404", _index3.Chat).start();
setTimeout(function () {
  //console.log("main");
  mainRouter.go("/#login");
}, 1000);
window.addEventListener("hashchange", changeRoute);