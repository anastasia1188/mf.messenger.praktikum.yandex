const REXP_EMAIL = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
const REXP_LOGIN = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]$');
const REXP_LITERAL = /[a-z]/i;
const REXP_NUMERAL = /[0-9]/;
const REXP_GAP = /\s/g;
