import Block from "../../modules/block";
import getTemplateMyButton from "./myButton.tmpl";

export default class myButton extends Block {
    props: object;
    constructor(props: Object) {
      super("button", props);
    }
  
    render(mainElem: HTMLElement) {
      return compileTemplate('.myButton', getTemplateMyButton(), this.props, mainElem);
    }
  } 
