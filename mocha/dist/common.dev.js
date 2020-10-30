"use strict";

var _router = require("../modules/router.js");

var _httpTransport = _interopRequireDefault(require("../modules/httpTransport.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.isEqual = _router.isEqual;
window.HTTPTransport = _httpTransport["default"];