"use strict";
let exports = {};
exports.__esModule = true;
exports.REXP_GAP = exports.REXP_NUMERAL = exports.REXP_LITERAL = exports.REXP_LOGIN = exports.REXP_EMAIL = void 0;
exports.REXP_EMAIL = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
exports.REXP_LOGIN = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
exports.REXP_LITERAL = /[a-z]/i;
exports.REXP_NUMERAL = /[0-9]/;
exports.REXP_GAP = /\s/g;