import Block from "../../../dist/modules/block.js";
import getTemplateMyButton from "./myButton.tmpl.js";

export default class myButton extends Block {
    constructor(props: Object) {
      super("button", props);
    }
  
    render(mainElem: HTMLElement) {
      return compileTemplate('.myButton', getTemplateMyButton(), this.props, mainElem);
    }
  } 
