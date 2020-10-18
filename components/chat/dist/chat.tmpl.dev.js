"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTemplateChat;
exports.__esModule = true;
exports.getTemplateChat = void 0;

function getTemplateChat() {
  return "<div class=\"chat-wrapper\">\n    <div class=\"chat-wrapper__left-part\">\n        <div class=\"chat-wrapper__search\">\n            <div class=\"chat-wrapper__logo\">\n                <img src=\"{{fimage}}\" alt=\"\" class=\"round\" width=\"80px\" height=\"80px\">\n                <div><a href=\"/#settings\" onclick = \"window.location.hash = '#settings'\"> {{fname}} </a></div>\n            </div>\n            <div> <input class=\"chat-wrapper__search-field\" type=\"search\" placeholder=\"\u041F\u043E\u0438\u0441\u043A\">\n            </div>\n        </div>\n        <div class=\"chat-wrapper__contacts\">\n            {{#each pianokeys}}\n            <div class=\"chat-wrapper__white-pianokey {{this.pressed}}\">\n                <div class=\"chat-wrapper__row-contact\">\n                    <div class=\"chat-wrapper__contact\"> {{this.contact}} </div>\n                    <div class=\"chat-wrapper__count-mes\"> {{this.countmes}} </div>\n                </div>\n                <div class=\"chat-wrapper__black-pianokey\" {{this.hidden}}></div>\n            </div>\n            {{/each}}\n        </div>\n    </div>\n    <div class=\"chat-wrapper__chat\">\n        <div class=\"chat-wrapper__messages\">\n            {{#each messages}}\n            <div class=\"chat-wrapper__date-mes\"> {{this.date}}</div>\n            {{#each this.message}}\n            <div class={{classmes}}> {{this.text}}\n                <div class=\"chat-wrapper__time-mes\"> {{this.time}} </div>\n            </div>\n            {{/each}} {{/each}}           \n        </div>\n        <input id=\"ineditor\" class=\"chat-wrapper__in-editor\">\n        <p class=\"chat-wrapper__errmes chat-wrapper__errmes-hiddenerr\" id=\"err-ineditor7\">\n            {{errmes}}\n        </p>\n    </div>\n</div>";
}

exports.getTemplateChat = getTemplateChat;