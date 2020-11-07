/// <reference path="../../../dist/modules/references.d.ts" />
import Block from "../../../dist/modules/block.js";
import { getTemplateErr } from "./err.tmpl.js";
export class Err extends Block {
    constructor(props) {
        super("err404", props);
    }
    render() {
        const context = { errmes: "Не туда попали", errcode: this.props.errcode, backToChat: "назад к чатам" };
        return compileTemplate('.template-err', getTemplateErr(), context);
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
const err = new Err({
    errcode: '404',
});
render(".template-err", err);
