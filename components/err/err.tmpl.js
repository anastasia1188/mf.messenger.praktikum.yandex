"use strict";
let exports = {};
exports.__esModule = true;
exports.getTemplateErr = void 0;

export function getTemplateErr() {
    return `<div class="basic-wrapper">
    <div class="basic-wrapper__item">
        <div class="basic-wrapper__line">
            <p> {{errcode}} </p>
        </div>
        <div class="basic-wrapper__line">
            <p> {{errmes}} </p>
        </div>
        <div class="basic-wrapper__href">
            <p> <a href="/#chat"> {{backToChat}} </a></p>
        </div>
    </div>
</div>`;
}

exports.getTemplateErr = getTemplateErr;