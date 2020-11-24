import Block from "../../../dist/modules/block.js";
import getTemplateMyButton from "./myButton.tmpl.js";
export default class myButton extends Block {
    constructor(props) {
        super("button", props);
    }
    render(mainElem) {
        return compileTemplate('.myButton', getTemplateMyButton(), this.props, mainElem);
    }
}
